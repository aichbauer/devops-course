# Testing

> This document provides information on how to write unit, integration and e2e tests for **<Project>**.


# Table of Contents

1. [Testing](#testing)
   - [Checklist for Writing Tests](#checklist-for-writing-tests)
2. [AAA-Pattern](#aaa-pattern)
3. [Integration Tests of the API](#integration-tests-of-the-api)
   - [Mock external APIs](#mock-external-apis)
4. [Schema Validation for the Gene Data](#schema-validation-for-the-gene-data)

Follow this checklist when writing tests:

1. Test behavior not the internal state. (e.g. given an input => what is the output)
2. Mock only when necessary (e.g. databases, external API).
3. Test the public facing interface, not private methods.
4. Only test one result per test.
5. Test the successfull result.
6. Test all unsuccessful results.
7. Follow the [Arrange-Act-Assert-Pattern](#aaa-pattern) for all tests and use comments (`// Arrange`, `// Act`, `// Assert`) to make them visible in the test.
8. Your test should not fail when you change the code implementation (e.g. refactor the code). The result stays the same.
9. Use the wording `actual` and `expected` for the results in your test.

## AAA-Pattern

> Read more about this pattern [here](https://martinfowler.com/bliki/GivenWhenThen.html)

**Arrange:** Setup the test, prepare the environment.

**Act:** Execute the test, perform the action.

**Assert:** Verify the result, check if the expected behavior is achieved.

## Integration Tests of the API

This is an example for writing integration tests for the api.

```js
it("should return the expected response", async ({ request }) => {
  // Arrange
  const endpoint = "/api/user/eda33002-b4cc-4fa2-9606-9783de509a85";
  const expectedResponseStatus = 200;
  const expectedResponseBody = {
    kind: 'users',
    itemsLength: 1,
    totalItems: 1,
    items: [
      {
        id: 'eda33002-b4cc-4fa2-9606-9783de509a85',
        // ...
        // ...
        // ...
      },
    ],
    error: null,
  };

  // Act
  const response = await request.get(endpoint);
  const actualResponseStatus = response.status();
  const actualResponseBody = await response.json();

  // Assert
  expect(actualResponseStatus).toEqual(expectedResponseStatus);
  expect(actualResponseBody).toEqual(expectedResponseBody);
});
```

### Mock external APIs

Whenever we have to call an external API (Stripe, Google Maps, etc...) we have to mock their interface and stub the responses.

If we write unit tests in the backend (e.g. we just want to validate the logic) we have to mock dependencies (e.g. external APIs, Databases, Message Queues, etc...).

Here is an example, given the following Stripe webhook:

```ts
// stripeWebhook.ts
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  let event;
  let result;

  try {
    // Verify webhook signature to ensure the event came from Stripe
    // for the test we need to mock this method and stub the response
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        result = await processSuccessfulPayment(paymentIntent);  // Process payment
        break;
      case 'payment_intent.failed':
        const paymentIntent = event.data.object;
        result = await processFailedPayment(paymentIntent);  // Process payment
        break;
      // ...
      // ...
      // ...
    }
  } catch (err) {
    console.log(`Error processing webhook: ${err.message}`);
    res.status(400);
    return;
  }

  res.status(200).json(result);
  return;
});
```

And the following `processPayment.ts`:

```ts
// processPayment.ts
export async function processSuccessfulPayment(paymentIntent) {
  // for the test we need to mock this method and stub the response
  const invoice = await stripe.invoices.retrieve(paymentIntent.invoice);

  if (invoice.subscription) {
    // logic for subscription
    return {
      success: true,
      subscription: true,
    };
  } else if {
    // logic for one time payment
    return {
      success: true,
      subscription: false,
    };
  }
}
```

This is an example test with a mocked stripe API.

```ts
import request from 'supertest';
import express from 'express';
import Stripe from 'stripe';
import router from './stripeWebhook';
import * as processPayment from './processPayment';

jest.mock('stripe');
jest.mock('./processPayment');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' }) as jest.Mocked<typeof Stripe>;
const app = express();
app.use(express.json());
app.use(router);

describe('POST /webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle a successful payment event', async () => {
    // Arrange
    const mockPaymentIntent = { id: 'pi_test', invoice: 'in_test' };
    const mockEvent = {
      type: 'payment_intent.succeeded',
      data: { object: mockPaymentIntent },
    };
    stripe.webhooks.constructEvent.mockReturnValue(mockEvent as any);
    (processPayment.processSuccessfulPayment as jest.Mock).mockResolvedValue({ success: true, subscription: true });
    const expectedResponseBody = { success: true, subscription: true };
    const expectedResponseStatus = 200;

    // Act
    const response = await request(app)
      .post('/webhook')
      .set('stripe-signature', 'valid_signature')
      .send({ /* mock request body */ });
    const actualResponseBody = response.body;
    const actualResponseStatus = response.status;

    // Assert
    expect(stripe.webhooks.constructEvent).toHaveBeenCalled();
    expect(processPayment.processSuccessfulPayment).toHaveBeenCalledWith(mockPaymentIntent);
    expect(processPayment.processFailedPayment).not.toHaveBeenCalled();
    expect(actualResponseStatus).toBe(expectedResponseStatus);
    expect(actualResponseBody).toEqual(expectedResponseBody);
  });
```

## Schema Validation for the Meilisearch

> We can detect a schema change of the database through the schema.prisma file

> We can detect a schema change of the meilisearch through a changing schema validation test

This is an example for writing schema validation tests for the meilisearch.

```js
import { MeiliSearch } from "meilisearch";
import { z } from "zod";

// Initialize the Meilisearch client
const client = new MeiliSearch({
  host: "host",
  apiKey: "your_api_key",
});

// Define the schema for the gene data
const expectedProjectSchema = z.object({
  id: z.string().uuid(),
  // ...
  // ...
  // ...
});

it("should return data from Meilisearch that matches the project schema", async () => {
  // Arrange
  const indexName = "projects";
  const projectId = "2a9aa034-5431-4097-a1a6-710f0cd69692";
  const expectedResult = true;

  // Act
  const index = client.index(indexName);
  const documents = await index.getDocuments({
    filter: `project_id = ${projectId}`,
    limit: 1,
  });
  const projectRecord = searchResult.hits[0];
  const actualValidatedProjectSchema = expectedProjectSchema.safeParse(projectRecord);
  const actualResult = actualValidatedProjectSchema.success;

  // Assert
  expect(actualResult).toBe(expectedResult);
});
```

## Frontend Unit Test

```ts
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for better assertions
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders the form with email and password inputs', () => {
    // Arrange
    render(<LoginForm onSubmit={mockSubmit} />);

    // Act
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    // Assert
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('displays an error if fields are empty on submission', () => {
    // Arrange
    render(<LoginForm onSubmit={mockSubmit} />);
    const submitButton = screen.getByTestId('submit-button');

    // Act
    fireEvent.click(submitButton);

    // Assert
    expect(screen.getByRole('alert')).toHaveTextContent('Email and password are required');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with email and password when valid', () => {
    // Arrange
    render(<LoginForm onSubmit={mockSubmit} />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    // Act
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepassword' } });
    fireEvent.click(submitButton);

    // Assert
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'securepassword',
    });
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('resets error when valid input is submitted after an error', () => {
    // Arrange
    render(<LoginForm onSubmit={mockSubmit} />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByText('Login');

    // Act 1: Submit empty form to trigger error
    fireEvent.click(submitButton);

    // Assert error appears
    expect(screen.getByRole('alert')).toHaveTextContent('Email and password are required');

    // Act 2: Submit valid form
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepassword' } });
    fireEvent.click(submitButton);

    // Assert
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'securepassword',
    });
  });
});
```


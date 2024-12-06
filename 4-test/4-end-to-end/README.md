# End-2-End Test

## What is a End-2-End Test?

End-2-End (E2E) testing is a methodology that tests the complete flow of an application from start to finish. It validates the functionality, performance, and behavior of the application by simulating real-world user scenarios, ensuring that the integrated components of the system work seamlessly together.

E2E testing verifies that the application behaves as expected in a production-like environment, ensuring that all dependent systems such as databases, APIs, and external services interact correctly.

## What Do We Need to Validate in a End-2-End Test?

In an E2E test, we validate User Scenarios:

* Does the application meet the end-user requirements?
* Are key user journeys functional from start to finish?
* Are all internal and external components communicating as expected?
* Do APIs, databases, and third-party services work together seamlessly?

## What Do We Need For End-2-End Tests?

To perform E2E tests, we require:

* **Test environment**: A staging or test environment that mimics the production environment
* **Test data**: Sample data sets that simulate real-world user scenarios.
* **Test Tools**: E.g., Playwright
* **Test Scenarios**: Clearly defined test cases representing real user journeyss
* **Access to All Components**: Access to services, databases, and APIs that the application interacts with

## What Are the Benefits of a End-2-End Test?

* **Comprehensive Validation**: Ensures that all components of the system work together as intended
* **User-Centric**: Focuses on real-world user scenarios, improving user experience
* **Improved Quality**: Detects issues that may not surface in unit or integration testing
* **Reduced Risks**: Identifies potential points of failure before release, reducing the risk of production issues
* **Confidence in Deployment**: Provides confidence that the application is production-ready

##  Example of an End-2-End Test

### Scenario: Testing an Online Shopping Platform

#### Objective:

Validate the complete purchase flow from browsing products to order confirmation.

---

#### Steps:

##### **1. User Login:**
- Navigate to the login page.
- Enter valid credentials and click login.
- Verify successful login by checking if the user dashboard loads.

##### **2. Browse Products:**
- Search for a product by name.
- Filter the results based on criteria (e.g., price, category).
- Verify that the filtered results are correct.

##### **3. Add to Cart:**
- Select a product from the search results.
- Add it to the cart.
- Verify that the cart is updated with the correct product and quantity.

##### **4. Checkout:**
- Proceed to the checkout page.
- Enter shipping and payment details.
- Verify that the entered details are saved and displayed correctly.

##### **5. Order Confirmation:**
- Submit the order.
- Verify that an order confirmation page with the correct details is displayed.
- Check for the receipt of a confirmation email.

##### **6. Database and API Validation:**
- Verify that the order details are correctly saved in the database.
- Ensure that the payment API was called successfully.

### Playwright

```js
// playwright.config.js (optional configuration)
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'http://localhost:3000', // Replace with your application's URL
    browserName: 'chromium',
    headless: false, // Set to true for CI/CD pipelines
    screenshot: 'on',
  },
});
```

```js
// tests/e2e-shopping.test.js
const { test, expect } = require('@playwright/test');

test.describe('Online Shopping Platform E2E Test', () => {
  test('Complete Purchase Flow', async ({ page }) => {
    // Step 1: User Login
    await page.goto('/login');
    await page.fill('input[name="email"]', 'user@example.com'); // Replace with test credentials
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard'); // Verify successful login

    // Step 2: Browse Products
    await page.goto('/products');
    await page.fill('input[placeholder="Search"]', 'Laptop'); // Search by product name
    await page.click('button#search');
    await expect(page.locator('.product-list')).toContainText('Laptop'); // Verify search results

    // Apply filters (e.g., price)
    await page.click('button#filter');
    await page.check('input[name="price-range"][value="1000-2000"]');
    await page.click('button#apply-filter');
    await expect(page.locator('.product-list')).not.toContainText('Out of Range'); // Validate filter results

    // Step 3: Add to Cart
    await page.click('button[data-testid="add-to-cart"]'); // Add the first product to the cart
    await page.goto('/cart');
    const cartItems = await page.locator('.cart-item');
    await expect(cartItems).toHaveCount(1); // Verify product in cart

    // Step 4: Checkout
    await page.goto('/checkout');
    await page.fill('input[name="shipping-address"]', '123 Test Street');
    await page.fill('input[name="payment-info"]', '4111 1111 1111 1111'); // Replace with test credit card
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/confirmation/); // Verify redirect to confirmation page

    // Step 5: Order Confirmation
    await expect(page.locator('h1')).toHaveText('Order Confirmed'); // Confirm message
    const confirmationMessage = await page.locator('.order-details').textContent();
    const orderId = await page.locator('.order-id').textContent();
    console.log('Order Confirmation Details:', confirmationMessage);

    // Step 6: Database and API Validation
    const apiResponse = await page.evaluate(() =>
      fetch(`/api/order-details/${orderId}`).then((res) => res.json())
    );
    expect(apiResponse).toMatchObject({ orderId: expect.any(String), status: 'success' });
  });
});
```

---


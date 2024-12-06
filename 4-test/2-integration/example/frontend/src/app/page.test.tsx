import 'isomorphic-fetch';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Home from './page';

afterAll(async () => {
  render(<Home />);

  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

  const deleteButton = screen.queryByTestId('delete-button');

  if (deleteButton) {
    await fireEvent.click(deleteButton);
  }
});

describe('Home', () => {
  test('renders empty messages', async () => {
    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    await waitFor(() => {
      expect(screen.queryByText('Messages')).toBeInTheDocument();
      expect(screen.queryByText('Send a message')).toBeInTheDocument();
      expect(screen.queryByTestId('messages')).not.toBeInTheDocument();
    });
  });

  test('add a message', async () => {
    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    await waitFor(() => {
      expect(screen.getByText('Messages')).toBeInTheDocument();
      expect(screen.getByText('Send a message')).toBeInTheDocument();
      expect(screen.queryByTestId('messages')).not.toBeInTheDocument();
    });

    const message = new Date().toISOString();
    const messageInput = screen.queryByTestId('message-input');
    const sendButton = screen.queryByTestId('send-button');

    await waitFor(() => {
      expect(messageInput).toBeInTheDocument();
      expect(sendButton).toBeInTheDocument();
    });

    await fireEvent.change(messageInput as HTMLElement, { target: { value: message } });
    await (sendButton as HTMLElement).click();

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.queryByTestId('messages')).toBeInTheDocument();
    });
  });
});
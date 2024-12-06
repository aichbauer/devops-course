'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3000/messages');
        console.log('res');
        console.log(res);
        const responseData = await res.json();

        setMessages(responseData?.data || []);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <div>
        <h1
          className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
          Messages
        </h1>
        {loading && <p>Loading...</p>}
        {messages.length > 0 && (
          <div>
            <ul data-testid="messages">
              {messages.map((message: any) => (
                <li key={message.message} className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>{message.message}</li>
              ))}
            </ul>
            <button
              data-testid="delete-button"
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              onClick={async (e) => {
                e.preventDefault();
                await fetch('http://localhost:3000/messages', {
                  method: 'DELETE',
                });

                setMessages([]);
              }}
              type="submit"
            >
              Delete All Messages
            </button>
          </div>
        )}
      </div>
      <div>
        <h2 className='mb-3 text-4xl font-extrabold dark:text-white'>Send a message</h2>
        <form>
          <label htmlFor="message" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Message</label>
          <input data-testid="message-input" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button
            data-testid="send-button"
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={async (e) => {
              e.preventDefault();
              await fetch('http://localhost:3000/messages', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message }),
              });

              setMessages([...messages, { message }]);
            }}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

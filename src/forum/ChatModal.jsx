import React, { useState } from 'react';

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg w-1/2 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Chat</h2>
          <button className="text-red-500" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="chat-messages h-64 overflow-y-scroll mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;

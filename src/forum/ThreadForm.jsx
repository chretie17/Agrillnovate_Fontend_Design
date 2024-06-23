import React, { useState } from 'react';
import '../App.css';

const ThreadForm = ({ onNewThread }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewThread(title);
    setTitle('');
  };

  return (
    <form className="thread-form flex flex-col space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Thread title"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create Thread
      </button>
    </form>
  );
};

export default ThreadForm;

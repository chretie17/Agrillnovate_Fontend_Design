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
    <form className="thread-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Thread title"
      />
      <button type="submit">Create Thread</button>
    </form>
  );
};

export default ThreadForm;

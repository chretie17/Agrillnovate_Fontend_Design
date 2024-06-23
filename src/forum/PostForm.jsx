import React, { useState } from 'react';
import '../index.css';

const PostForm = ({ onNewPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewPost(content);
    setContent('');
  };

  return (
    <form className="post-form mt-4 flex flex-col space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Post
      </button>
    </form>
  );
};

export default PostForm;

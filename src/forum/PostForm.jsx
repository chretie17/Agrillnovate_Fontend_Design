import React, { useState } from 'react';
import '../App.css';

const PostForm = ({ onNewPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewPost(content);
    setContent('');
  };

  return (
    <form className="post-form mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Post
      </button>
    </form>
  );
};

export default PostForm;

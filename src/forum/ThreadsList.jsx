import React from 'react';
import '../App.css';

const ThreadsList = ({ threads, onThreadSelect }) => {
  return (
    <div className="thread-list">
      <h2 className="text-2xl font-semibold mb-4">Forum Threads</h2>
      <ul className="list-disc pl-5">
        {threads.map((thread) => (
          <li
            key={thread.threadId}
            onClick={() => onThreadSelect(thread.threadId)}
            className="mb-2 cursor-pointer text-blue-500 hover:underline"
          >
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadsList;

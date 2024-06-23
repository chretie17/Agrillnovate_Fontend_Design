import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const ThreadsList = ({ threads, onThreadSelect }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Typography variant="h5" component="h2" className="text-brand mb-4">
        Forum Threads
      </Typography>
      <List className="space-y-2">
        {threads.map((thread) => (
          <ListItem
            key={thread.threadId}
            button
            onClick={() => onThreadSelect(thread.threadId)}
            className="hover:bg-brand-400 cursor-pointer bg-gray-100 rounded-lg p-3"
          >
            <ListItemText primary={thread.title} className="text-primary font-medium" />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ThreadsList;

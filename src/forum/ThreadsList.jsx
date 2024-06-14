import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const ThreadsList = ({ threads, onThreadSelect }) => {
  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Forum Threads
      </Typography>
      <List>
        {threads.map((thread) => (
          <ListItem
            key={thread.threadId}
            button
            onClick={() => onThreadSelect(thread.threadId)}
          >
            <ListItemText primary={thread.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ThreadsList;

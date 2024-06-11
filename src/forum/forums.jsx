import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import { connect, sendMessage } from '../services/WebSocketService';

const Forums = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    connect(onMessageReceived, 'forums');
  }, []);

  const onMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const message = {
      content: newMessage,
      timestamp: new Date(),
    };
    sendMessage('/app/forums', message);
    setNewMessage('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Forums</Typography>
      <Card>
        <CardContent>
          <TextField
            label="New Message"
            value={newMessage}
            onChange={handleMessageChange}
            fullWidth
            multiline
          />
          <Button onClick={handleSendMessage} variant="contained" color="primary">
            Send
          </Button>
        </CardContent>
      </Card>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={message.content}
              secondary={new Date(message.timestamp).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Forums;

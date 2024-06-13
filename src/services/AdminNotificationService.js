import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const socketUrl = 'http://localhost:8080/ws'; // Adjust to your backend WebSocket endpoint

let stompClient = null;

export const connectSSE = (onMessageReceived) => {
  const socket = new SockJS(socketUrl);
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe('/topic/notifications', (message) => {
      const notification = JSON.parse(message.body);
      const formattedNotification = {
        user: notification.user || "Unknown",
        message: notification.message || "No message provided",
        thread: notification.thread || "Unknown",
        dateSent: notification.dateSent || new Date().toISOString(),
      };
      onMessageReceived(formattedNotification);
    });
  });

  return stompClient;
};

export const disconnectSSE = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
};

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export function connect(onMessageReceived) {
  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: function (str) {
      console.log('WebSocketService.js:', str);
    },
    onConnect: () => {
      console.log('WebSocketService.js: Web Socket Opened and Connected...');
      onMessageReceived();
    },
    onStompError: (frame) => {
      console.error('WebSocketService.js: Broker reported error: ' + frame.headers['message']);
      console.error('WebSocketService.js: Additional details: ' + frame.body);
    },
    onWebSocketError: (error) => {
      console.error('WebSocketService.js: WebSocket error:', error);
    },
    onWebSocketClose: (event) => {
      console.log('WebSocketService.js: WebSocket connection closed:', event);
    }
  });

  stompClient.activate();
}

export const sendMessage = (destination, message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: destination,
      body: JSON.stringify(message),
    });
  } else {
    console.error('WebSocketService.js: WebSocket connection not established.');
  }
};

export const connectWebSocket = (onNotificationReceived) => {
  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: function (str) {
      console.log('WebSocketService.js:', str);
    },
    onConnect: () => {
      console.log('WebSocketService.js: Web Socket Opened and Connected...');
      stompClient.subscribe('/topic/notifications', (message) => {
        onNotificationReceived(JSON.parse(message.body));
      });
    },
    onStompError: (frame) => {
      console.error('WebSocketService.js: Broker reported error: ' + frame.headers['message']);
      console.error('WebSocketService.js: Additional details: ' + frame.body);
    },
    onWebSocketError: (error) => {
      console.error('WebSocketService.js: WebSocket error:', error);
    },
    onWebSocketClose: (event) => {
      console.log('WebSocketService.js: WebSocket connection closed:', event);
    }
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient !== null) {
    stompClient.deactivate();
  }
};

export const getStompClient = () => stompClient;

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { connectSSE, disconnectSSE } from '../services/AdminNotificationService';
import moment from 'moment';

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNotification = (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    };

    const eventSource = connectSSE(handleNotification);

    return () => {
      disconnectSSE(eventSource);
    };
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Date Sent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.notificationID}>
              <TableCell>{notification.user?.name || 'Unknown'}</TableCell>
              <TableCell>{notification.message}</TableCell>
              <TableCell>{moment(notification.dateSent).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationsTable;

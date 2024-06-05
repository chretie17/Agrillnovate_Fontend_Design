import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const NotificationsTable = ({ notifications }) => {
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
              <TableCell>{notification.user.name}</TableCell>
              <TableCell>{notification.message}</TableCell>
              <TableCell>{notification.dateSent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationsTable;

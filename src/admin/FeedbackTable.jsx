import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FeedbackTable = ({ feedback }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Research</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Date Submitted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedback.map((item) => (
            <TableRow key={item.feedbackID}>
              <TableCell>{item.user.name}</TableCell>
              <TableCell>{item.research.title}</TableCell>
              <TableCell>{item.comments}</TableCell>
              <TableCell>{item.dateSubmitted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedbackTable;

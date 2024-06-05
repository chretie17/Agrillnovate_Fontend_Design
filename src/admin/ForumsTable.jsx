import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ForumsTable = ({ forums }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Topic</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forums.map((forum) => (
            <TableRow key={forum.forumID}>
              <TableCell>{forum.topic}</TableCell>
              <TableCell>{forum.createdBy}</TableCell>
              <TableCell>{forum.dateCreated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ForumsTable;

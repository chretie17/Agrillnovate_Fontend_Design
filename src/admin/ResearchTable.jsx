import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ResearchTable = ({ research }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Date Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {research.map((item) => (
            <TableRow key={item.researchID}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.datePublished}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResearchTable;

import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';

const ResearchTable = ({ research }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Published</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {research.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((res) => (
              <TableRow key={res.researchID}>
                <TableCell>{res.researchID}</TableCell>
                <TableCell>{res.title}</TableCell>
                <TableCell>{res.author}</TableCell>
                <TableCell>{res.status}</TableCell>
                <TableCell>{res.datePublished}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={research.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ResearchTable;

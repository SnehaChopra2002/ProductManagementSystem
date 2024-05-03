import React, { useState } from 'react';
import { TablePagination } from '@mui/material';

interface PaginationProps {
  totalProducts: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalProducts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalProducts}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default PaginationComponent;

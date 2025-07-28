import { TablePagination } from "@mui/material";
const CustomPaginationV2 = ({
  total,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  rowsPerPageOptions = [5, 10, 25, 50],
}) => {
  const handleChangePage = (e, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
};

export default CustomPaginationV2;

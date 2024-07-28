import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  useTheme,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  IconButton,
  TablePagination,
  Box,
  TableCellProps,
  Typography,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { ROWS_PER_PAGE } from "@src/constants";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { amber, blue, green, lime, red } from "@mui/material/colors";

const Img = styled("img")(({ theme }) => ({
  width: 30,
  height: 30,
  objectFit: "contain",
  objectPosition: "center",
}));

// Define the types for headers and rows
interface TableColumn {
  id: string;
  label: string;
  align?: TableCellProps["align"];
  minWidth?: number;
}

interface TableRowData {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  rows: TableRowData[];
  detailsLink: string;
  count: number;
  page: number;
  noActions?: boolean;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>, rowId: string) => void;
}

const UniTable: React.FC<TableProps> = ({
  columns,
  rows,
  count,
  page,
  onPageChange,
  onDeleteClick,
  detailsLink,
  noActions=false,
}) => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper} elevation={1} sx={{ py: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {count > 0 ? (
            rows?.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:nth-of-type(odd)": {
                    bgcolor: theme.palette.action.hover,
                  },
                }}>
                {columns.map((column) => {
                  if (column.id === "user.username") {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {row?.user?.username}
                      </TableCell>
                    );
                  }
                  if (column.id === "price") {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        ${row.price}
                      </TableCell>
                    );
                  }
                  if (column.id === "status") {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Typography
                          sx={{
                            fontSize: 10,
                            px: 1,
                            py: 0.3,
                            borderRadius: 10,
                            textTransform: "capitalize",
                            textAlign: "center",
                            width: "fit-content",
                            minWidth: 80,
                            fontWeight: 700,
                            color: "#000",
                            ...(row?.status === "pending" && {
                              backgroundColor: amber[100],
                              color: amber[900],
                            }),
                            ...(row?.status === "processing" && {
                              backgroundColor: blue[100],
                              color: blue[900],
                            }),
                            ...(row?.status === "shipped" && {
                              backgroundColor: green[100],
                              color: green[900],
                            }),
                            ...(row?.status === "delivered" && {
                              backgroundColor: lime[100],
                              color: lime[900],
                            }),
                            ...(row?.status === "cancelled" && {
                              backgroundColor: red[100],
                              color: red[900],
                            }),
                          }}>
                          {row?.status}
                        </Typography>
                      </TableCell>
                    );
                  }
                  if (column.id === "createdAt") {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {dayjs(row.createdAt).format("DD MMM YYYY")}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "photo" ? <Img src={row[column.id]} alt={row.name} /> : row[column.id]}
                    </TableCell>
                  );
                })}
                {!noActions && <TableCell>
                  <IconButton color="primary" component={Link} to={`${detailsLink}/${row._id}`}>
                    <MdEdit />
                  </IconButton>
                  <IconButton color="error" onClick={(e) => onDeleteClick(e, row._id)}>
                    <MdDelete />
                  </IconButton>
                </TableCell>}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} sx={{ borderBottom: "unset" }}>
                <Box textAlign="center" py={3}>
                  No Data found
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={ROWS_PER_PAGE}
        rowsPerPageOptions={[ROWS_PER_PAGE]}
      />
    </TableContainer>
  );
};

export default UniTable;

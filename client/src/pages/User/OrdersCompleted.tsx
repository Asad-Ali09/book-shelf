import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { setError } from "../../redux/auth/authSlice";
import { getAllOrders } from "../../redux/orders/orderServices";
import applyPagination from "../../utils/pagination";
import useRedirectUser from "../../hooks/useRedirectUser";

const useOrders = (page: number, rowsPerPage: number) => {
  const { orders } = useAppSelector((state) => state.orders);
  return useMemo(() => {
    return applyPagination(orders, page, rowsPerPage);
  }, [page, rowsPerPage, orders]);
};

// const useCustomerIds = (customers: dType[]) => {
//   return useMemo(() => {
//     return customers.map((customer) => customer.id);
//   }, [customers]);
// };

const OrdersCompleted = () => {
  useRedirectUser("/login");

  const { error } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const orders = useOrders(page, rowsPerPage);
  // const customersIds = useCustomerIds(customers);

  const handlePageChange = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(Number(event.target.value));
    },
    []
  );

  return (
    <>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography variant="h4">Orders</Typography>
          </Stack>
          <Box maxWidth={"90vw"}>
            {orders.length === 0 ? (
              <>
                <Typography variant="h3" textAlign={"center"} width={"100%"}>
                  No Orders Recieved yet
                </Typography>
              </>
            ) : (
              <OrdersTable
                count={orders.length}
                items={orders}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default OrdersCompleted;

type tablePropsType = {
  count: number;
  items: IOrder[];
  onPageChange: (
    e: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => void;
  onRowsPerPageChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  page: number;
  rowsPerPage: number;
};

export const OrdersTable = (props: tablePropsType) => {
  const {
    count = 0,
    items = [],
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState<OrderBooksType>([]);

  const handleClickOpen = (books: OrderBooksType) => {
    setBooks(books);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
                const createdAt = format(order.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow
                    onClick={() => handleClickOpen(order.books)}
                    hover
                    sx={{ cursor: "pointer" }}
                    key={order._id}
                  >
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar>{order.buyerName[0]}</Avatar>
                        <Typography variant="subtitle2">
                          {order.buyerName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{order.shippingAddress}</TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <Chip color="warning" label={order.status} />
                    </TableCell>
                    {/* <TableCell>{customer.phone}</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <SimpleDialog books={books} open={open} onClose={handleClose} />
    </>
  );
};

export interface SimpleDialogProps {
  open: boolean;
  books: OrderBooksType;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, books, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Ordered Books</DialogTitle>
      <List sx={{ px: 2, pt: 0 }}>
        <ListItem disableGutters sx={{ display: "flex", gap: 2 }}>
          <ListItemAvatar>{"Cover"}</ListItemAvatar>
          <ListItemText primary={"Title"} />
          <Typography>{"Quantity"}</Typography>
        </ListItem>
        {books.map((bookItem) => (
          <ListItem
            disableGutters
            key={bookItem.book.bookID}
            sx={{ display: "flex", gap: 5 }}
          >
            <ListItemAvatar>
              <img
                src={bookItem.book.coverPhoto}
                alt={bookItem.book.title}
                height={"100"}
              />
            </ListItemAvatar>
            <ListItemText primary={bookItem.book.title} />
            <Typography>{bookItem.quantity}</Typography>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

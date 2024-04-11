import {
  Divider,
  Grid,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import SellerBookCard from "../../components/SellerBooks/SellerBookCard";
import TopBar from "../../components/SellerBooks/TopBar";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import applyPagination from "../../utils/pagination";
import useRedirectUser from "../../hooks/useRedirectUser";
import { getAllSellerBooks } from "../../redux/auth/sellerServices";

const MyBooks = () => {
  useRedirectUser("/login");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllSellerBooks());
  }, [dispatch]);

  const { myBooks } = useAppSelector((state) => state.auth);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const useBooks = () => {
    return useMemo(() => {
      return applyPagination(myBooks, page, rowsPerPage);
    }, []);
  };

  const books = useBooks();

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
    <Stack>
      <TopBar />
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={[1, 2]}>
        {books.length === 0 && (
          <>
            <Typography variant="h3" textAlign={"center"} width={"100%"}>
              No Books added yet
            </Typography>
          </>
        )}
        {books.map((book, index) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
            <Stack alignItems={"center"}>
              <SellerBookCard
                key={book._id}
                title={book.title}
                author={book.author}
                bookID={book._id}
                price={book.price}
                quantity={book.quantity}
                imageURL={book.coverPhoto}
                description={book.description}
                genres={book.genres}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
      {books.length > 0 && (
        <>
          <Divider />
          <TablePagination
            sx={{ mt: "auto" }}
            component="div"
            count={myBooks.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[4, 8, 16]}
          />
        </>
      )}
    </Stack>
  );
};

export default MyBooks;

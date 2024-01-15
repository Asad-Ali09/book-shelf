import { Divider, Grid, Stack } from "@mui/material";
import SellerBookCard from "../../components/SellerBooks/SellerBookCard";
import TopBar from "../../components/SellerBooks/TopBar";
import { useAppSelector } from "../../hooks/useTypedSelector";

const MyBooks = () => {
  const { myBooks } = useAppSelector((state) => state.auth);

  return (
    <>
      <TopBar />
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={[1, 2]}>
        {myBooks.map((book, index) => (
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
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyBooks;

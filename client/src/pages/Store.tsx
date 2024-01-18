import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TablePagination,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import BookCard from "../components/BookCard";
import SideBar from "../components/SideBar";
import bookGenres from "../genres";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { getAllBooks } from "../redux/books/bookServices";
import { setError } from "../redux/books/bookSlice";
import applyPagination from "../utils/pagination";
import { addItemToCart } from "../redux/cart/cartSlice";

interface StoreProps {
  sideBarProps: {
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const Store = ({ sideBarProps }: StoreProps) => {
  const { mobileOpen, setMobileOpen, setIsClosing } = sideBarProps;

  const dispatch = useAppDispatch();
  const { books: allBooks, error } = useAppSelector((state) => state.books);

  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("");

  const useBooks = () => {
    return useMemo(() => {
      return applyPagination(filteredBooks, page, rowsPerPage);
    }, [page, rowsPerPage, filteredBooks]);
  };

  const sort = (books: IBook[]) => {
    if (sortBy === "") return;
    if (sortBy === "p-asc") {
      books.sort((a, b) => a.price - b.price);
    } else if (sortBy === "p-desc") {
      books.sort((a, b) => b.price - a.price);
    } else if (sortBy === "d-desc") {
      books.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (sortBy === "d-asc") {
      books.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      });
    }
  };

  const useFilters = () => {
    let searchedBooks = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
    if (genre !== "") {
      searchedBooks = searchedBooks.filter((book) =>
        book.genres.some(
          (gen) => gen.toLocaleLowerCase() === genre.toLocaleLowerCase()
        )
      );
    }
    sort(searchedBooks);
    return searchedBooks;
  };

  const resetFilters = () => {
    handlePageChange(null, 0);
    setGenre("");
    setSearch("");
    setSortBy("");
  };

  const filteredBooks = useFilters();

  const books = useBooks();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

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

  const sideBar = (
    <List>
      <ListItem>
        <Button variant="contained" size="small" onClick={resetFilters}>
          Remove Filters
        </Button>
      </ListItem>
      <ListItem>
        {/* <ListItemText primary="Category" /> */}
        <FormControl fullWidth>
          <InputLabel id="category-label">Select Category</InputLabel>
          <Select
            fullWidth
            labelId="category-label"
            label="Select Category"
            id="category-select"
            value={genre}
            onChange={(e) => {
              setPage(0);
              setGenre(e.target.value as string);
            }}
            // onChange={handleCategoryChange}
          >
            {bookGenres.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl>
          <FormLabel id="sorting-filter">Sort By</FormLabel>
          <RadioGroup
            aria-labelledby="sorting-filter"
            name="sorting-filter"
            value={sortBy}
            onChange={(e) => {
              setPage(0);
              setSortBy(e.target.value);
            }}
          >
            <FormControlLabel
              value="p-asc"
              control={<Radio />}
              label="Price: Low to High"
            />
            <FormControlLabel
              value="p-desc"
              control={<Radio />}
              label="Price: High to Low"
            />
            <FormControlLabel
              value="d-desc"
              control={<Radio />}
              label="Date: Newest First"
            />
            <FormControlLabel
              value="d-asc"
              control={<Radio />}
              label="Date: Oldest First"
            />
          </RadioGroup>
        </FormControl>
      </ListItem>
    </List>
  );

  const addToCart = (book: RIBook) => {
    dispatch(addItemToCart(book));
  };

  return (
    <>
      <Box display={"flex"} minHeight={"100vh"}>
        <SideBar
          mobileOpen={mobileOpen}
          drawerWidth={md ? 240 : 300}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        >
          <>
            <Toolbar />
            <Box my={2}>
              <Typography variant="h5" textAlign={"center"}>
                Apply Filters
              </Typography>
            </Box>
            {sideBar}
          </>
        </SideBar>
        <Box flexGrow={1} p={1}>
          <Toolbar />
          {/* Compoenet */}
          <TopBar
            search={search}
            setSearch={(query: string) => {
              setPage(0);
              setSearch(query);
            }}
          />

          <Grid container spacing={[1, 2]}>
            {books.length === 0 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h3" textAlign={"center"} my={4}>
                    Sorry. No Books Found...
                  </Typography>
                </Grid>
              </>
            )}
            {books.map((book, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Stack alignItems={"center"} height={"100%"}>
                    <BuyerBookCard
                      title={book.title}
                      author={book.author}
                      bookID={book._id}
                      price={book.price}
                      quantity={book.quantity}
                      imageURL={book.coverPhoto}
                      key={book._id}
                      genres={book.genres}
                      addToCart={() => addToCart(book)}
                    />
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
          <Divider />
          <TablePagination
            sx={{ mt: "auto" }}
            component="div"
            count={filteredBooks.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[4, 8, 16, 32]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Store;

type topBarProps = {
  search: string;
  setSearch: (search: string) => void;
};

const TopBar = ({ search, setSearch }: topBarProps) => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Grid container spacing={2} pb={2} alignItems={"center"}>
        {/* <Stack direction={"row"} alignItems={"center"} pb={2}> */}
        <Grid item xs={6} lg={4}>
          {!md && (
            <Typography fontSize={36} fontFamily={"inter"} variant="h3" px={2}>
              Book Store
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} lg={5}>
          <Stack ml={"auto"} direction={"row"} alignItems={"center"}>
            <TextField
              sx={{
                bgcolor: "white",
              }}
              label="Search Books"
              variant="outlined"
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>
        </Grid>
        {/* </Stack> */}
      </Grid>
      <Divider />
    </>
  );
};

interface propsType {
  title: string;
  author: string;
  quantity: number;
  price: number;
  bookID: string;
  imageURL: string;
  genres: string[];
  addToCart: () => void;
}

const BuyerBookCard = (props: propsType) => {
  const { title, author, quantity, price, imageURL, addToCart } = props;

  return (
    <>
      <BookCard
        title={title}
        author={author}
        imageURL={imageURL}
        price={price}
        quantity={quantity}
      >
        <>
          <Button fullWidth onClick={addToCart}>
            Add to Cart
          </Button>
        </>
      </BookCard>
    </>
  );
};

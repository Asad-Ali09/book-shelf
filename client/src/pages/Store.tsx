import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import BookCard from "../components/BookCard";
import bookGenres from "../genres";
import SideBar from "../components/SideBar";

interface StoreProps {
  sideBarProps: {
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
const arr = new Array(6).fill(0);
const Store = ({ sideBarProps }: StoreProps) => {
  const { mobileOpen, setMobileOpen, setIsClosing } = sideBarProps;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const sideBar = (
    <List>
      <ListItem>
        {/* <ListItemText primary="Category" /> */}
        <FormControl fullWidth>
          <InputLabel id="category-label">Select Category</InputLabel>
          <Select
            fullWidth
            labelId="category-label"
            label="Select Category"
            id="category-select"
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
        <TextField
          fullWidth
          size="small"
          id="author-input"
          label="Search by Author"
          variant="outlined"
          //   onChange={handleAuthorChange}
        />
        <IconButton size="large" aria-label="search">
          <Search />
        </IconButton>
      </ListItem>
    </List>
  );

  return (
    <>
      <Box display={"flex"} minHeight={"100vh"}>
        <SideBar
          mobileOpen={mobileOpen}
          drawerWidth={340}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        >
          <>
            <Toolbar />
            <Box my={2}>
              <Typography variant="h5" textAlign={"center"}>
                Filter
              </Typography>
            </Box>
            {sideBar}
          </>
        </SideBar>
        <Box flexGrow={1} p={1}>
          <Toolbar />
          {/* Compoenet */}
          <TopBar />

          <Grid container spacing={[1, 2]}>
            {arr.map((_, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <BuyerBookCard />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Store;

const TopBar = () => {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} pb={2}>
        <Typography fontSize={36} fontFamily={"inter"} variant="h3" px={2}>
          Book Store
        </Typography>
        <Stack ml={"auto"} direction={"row"} alignItems={"center"}>
          <TextField
            sx={{
              bgcolor: "white",
            }}
            label="Search Books"
            variant="outlined"
            size="small"
            fullWidth
          />
          <IconButton aria-label="delete">
            <Search />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />
    </>
  );
};

const BuyerBookCard = () => {
  return (
    <>
      <BookCard title={""} author={""} imageURL={""} price={5} quantity={10}>
        <>
          <Button fullWidth>Add to Cart</Button>
        </>
      </BookCard>
    </>
  );
};

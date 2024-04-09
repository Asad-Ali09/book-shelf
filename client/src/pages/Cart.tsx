import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Theme,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import SideBar from "../components/SideBar";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

interface CartPropsType {
  sideBarProps: {
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const CartWrapper = ({ sideBarProps }: CartPropsType) => {
  const { mobileOpen, setMobileOpen, setIsClosing } = sideBarProps;
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const drawerWidth = md ? 240 : 400;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <>
      <Box display={"flex"} minHeight={"100vh"} flexDirection={"row-reverse"}>
        <SideBar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          anchor="right"
        >
          <Drawer />
        </SideBar>
        <Box sx={{ flexGrow: 1 }} p={1}>
          <Toolbar />
          <Cart />
        </Box>
      </Box>
    </>
  );
};

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <>
      <Stack p={2}>
        {/* Product Card */}
        {cartItems.map((item) => (
          <CartBookCard book={item.book} quantity={item.quantity} />
        ))}
      </Stack>
    </>
  );
};

const InterTypo = styled(Typography)({
  fontFamily: "Inter",
});

const Drawer = () => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const { itemsPrice, shippingPrice, totalPrice } = useAppSelector(
    (state) => state.cart
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }} p={2}>
        <Toolbar />

        <Box>
          <InterTypo variant={"h4"} fontFamily={"inter"}>
            Cart
          </InterTypo>
          <Divider sx={{ my: 1 }} />
          <Stack spacing={1}>
            <Stack direction={"row"} spacing={2} fontFamily={"inter"}>
              <InterTypo
                variant={md ? "h6" : "h5"}
                fontFamily={"inherit"}
                color={"text.secondary"}
              >
                Subtotal:{" "}
              </InterTypo>
              <InterTypo
                variant={md ? "h6" : "h5"}
                color={"text.secondary"}
                fontFamily={"inherit"}
              >
                ${itemsPrice}
              </InterTypo>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <InterTypo variant={md ? "h6" : "h5"} color={"text.secondary"}>
                {" "}
                Shipping Fee:{" "}
              </InterTypo>
              <InterTypo variant={md ? "h6" : "h5"} color={"text.secondary"}>
                ${shippingPrice}
              </InterTypo>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <InterTypo variant={md ? "h5" : "h4"} fontWeight={"bold"}>
                Total:{" "}
              </InterTypo>
              <InterTypo variant={md ? "h5" : "h4"} fontWeight={"bold"}>
                ${totalPrice}
              </InterTypo>
            </Stack>
          </Stack>
          <Stack spacing={1} my={2} direction={md ? "column" : "row"}>
            <Button variant="contained" onClick={() => navigate("/checkout")}>
              Checkout
            </Button>
            <Button variant="outlined" onClick={() => navigate("/store")}>
              Shop More
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

type CartBookCardPropsType = {
  book: RIBook;
  quantity: number;
};

const CartBookCard = ({ book, quantity }: CartBookCardPropsType) => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();

  const inc = () => {
    dispatch(increaseQuantity(book));
  };
  const dec = () => {
    dispatch(decreaseQuantity(book));
  };

  const remove = () => {
    dispatch(removeItem(book));
  };

  return (
    <>
      <Card
        component={Stack}
        direction={sm ? "column" : "row"}
        sx={{ width: "100%", my: 1, height: "100%" }}
        alignItems={"center"}
        p={1}
      >
        <CardMedia
          sx={{
            width: 150,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            bgcolor: "#F0F0EB",
            py: 1,
            // backgroundImage: `url(${imageURL})`,
            backgroundImage: `linear-gradient(to right bottom, rgba(0,0,0,0.7), rgb(47 41 41 / 80%)),url(${book.coverPhoto})`,
          }}
          title="green iguana"
        >
          <img
            src={book.coverPhoto}
            alt="book cover"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </CardMedia>
        <CardContent
          component={Stack}
          direction={sm ? "column" : "row"}
          justifyContent={"space-between"}
          width={"100%"}
          spacing={1}
        >
          <Stack spacing={1}>
            <Typography variant={md ? "h5" : "h4"}>{book.title}</Typography>
            <Typography variant={md ? "h6" : "h5"} color={"text.secondary"}>
              {book.author}
            </Typography>
          </Stack>

          <Stack spacing={2} justifyContent={"space-between"}>
            <Stack spacing={2}>
              <ButtonGroup
                fullWidth
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button onClick={dec}>-</Button>
                <Button
                  variant="text"
                  disabled
                  sx={{ ":disabled": { color: "text.primary" } }}
                >
                  {quantity}
                </Button>
                <Button onClick={inc}>+</Button>
              </ButtonGroup>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography textAlign={"right"}>SubTotal:</Typography>
                <Typography variant={md ? "h6" : "h5"} textAlign={"right"}>
                  ${book.price * quantity}
                </Typography>
              </Stack>
            </Stack>

            <Button variant="outlined" onClick={remove}>
              Remove
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CartWrapper;

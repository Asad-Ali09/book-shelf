import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAppSelector } from "../../hooks/useTypedSelector";

export default function Review() {
  const { shippingDetails, cartItems, totalPrice, shippingPrice } =
    useAppSelector((state) => state.cart);

  const address = () => {
    let ad = `${shippingDetails.address1}, ${shippingDetails.city}`;
    if (shippingDetails.state) ad += `, ${shippingDetails.state}`;
    if (shippingDetails.country) ad += `, ${shippingDetails.country}`;
    return ad;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.book._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.book.title}
              secondary={product.book.author}
            />
            <Typography variant="body2">
              ${product.book.price * product.quantity}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Shipping Fee"} />
          <Typography variant="body2">${shippingPrice}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>

      {/* Shipping Details */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <Stack direction="row" spacing={2} alignItems="center"> */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2 }}
            // display={"flex"}
            // alignItems={"center"}
          >
            Shipping
            {/* <LocationOn /> */}
          </Typography>
          {/* </Stack> */}
          <Typography
            gutterBottom
          >{`${shippingDetails.firstName} ${shippingDetails.lastName}`}</Typography>
          <Typography gutterBottom>{address()}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>Cash on Delivery</Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

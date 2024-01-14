import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const imgSrc =
  "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg";

const SellerBookCard = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 300, width: "100%", my: 1 }} elevation={3}>
        <CardMedia
          sx={{
            height: 200,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            bgcolor: "#F0F0EB",
            py: 1,
          }}
          title="green iguana"
        >
          <img
            src={imgSrc}
            alt="book cover"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            OLIVIA WILSON
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            SOUL
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Quantity:{" "}
            </Typography>
            <Typography variant="body2" color="black">
              10
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Price:{" "}
            </Typography>
            <Typography variant="body2" color="black">
              $110
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button size="small" variant="contained" fullWidth>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            fullWidth
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* ---------------------------- */}
      {/* Delete Dialogue */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete all copies of ${"SOUL"}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this book from your inventory?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SellerBookCard;

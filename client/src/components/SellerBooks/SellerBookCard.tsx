import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import BookCard from "../BookCard";

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
      <BookCard>
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
      </BookCard>

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

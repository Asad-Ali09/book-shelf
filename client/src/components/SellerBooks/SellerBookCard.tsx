import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { setError } from "../../redux/auth/authSlice";
import { deleteBook } from "../../redux/auth/sellerServices";
import BookCard from "../BookCard";
import { BookFormDialog } from "./BookFormDialog";

type propsType = {
  title: string;
  author: string;
  quantity: number;
  price: number;
  bookID: string;
  imageURL: string;
  description: string;
  genres: string[];
};

const SellerBookCard = ({
  title,
  author,
  quantity,
  price,
  bookID,
  imageURL,
}: propsType) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleClickEditDailogOpen = () => {
    setEditOpen(true);
  };

  const dispath = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeBook = () => {
    dispath(deleteBook(bookID))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      });
    handleClose();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispath(setError(null));
    }
  }, [error]);

  return (
    <>
      <BookCard
        title={title}
        author={author}
        price={price}
        quantity={quantity}
        imageURL={imageURL}
      >
        <CardActions>
          <Button
            size="small"
            variant="contained"
            fullWidth
            onClick={handleClickEditDailogOpen}
          >
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
            Cancel
          </Button>
          <Button onClick={removeBook}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Book Dailogue */}
      <BookFormDialog
        open={editOpen}
        setOpen={setEditOpen}
        key={bookID}
        bookID={bookID}
      />
    </>
  );
};

export default SellerBookCard;

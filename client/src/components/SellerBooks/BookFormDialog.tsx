import { Cancel, Check, Close, CloudUpload } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ChangeEvent, FormEvent, forwardRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { setError, setLoading } from "../../redux/auth/authSlice";
import {
  addBook,
  addBookPropsType,
  editBook,
} from "../../redux/auth/sellerServices";
import uploadImage from "../../utils/uploadImage";
import bookGenres from "../../genres";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type bookFormType = {
  title: string;
  author: string;
  description: string;
  price: number | null;
  quantity: number | null;
  genres: string[];
};

const initialbookFormState: bookFormType = {
  title: "",
  author: "",
  description: "",
  price: null,
  quantity: null,
  genres: [],
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type BookFormDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookID?: string;
};

export const BookFormDialog = (props: BookFormDialogProps) => {
  const { open, setOpen, bookID } = props;

  let book: IBook | undefined = useAppSelector((state) =>
    state.auth.myBooks.find((book) => book._id === bookID)
  );

  const [addBookForm, setAddBookForm] = useState<bookFormType>(
    (book as bookFormType) || initialbookFormState
  );

  const { title, author, description, price, quantity } = addBookForm;

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error]);

  const [selectedNames, setSelectedNames] = useState<string[]>(
    book?.genres || []
  );
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(book?.coverPhoto || null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selecteFile = event.target.files?.[0];

    if (!selecteFile) return;
    setFile(selecteFile);

    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result as string);
    };

    reader.readAsDataURL(selecteFile);
  };

  const handleDialogClose = () => {
    setAddBookForm(book || initialbookFormState);
    setFile(null);
    setImgUrl(book?.coverPhoto || null);
    setSelectedNames(book?.genres || []);
    setOpen(false);
  };

  const dialogeCloseonAdd = () => {
    setAddBookForm(initialbookFormState);
    setFile(null);
    setImgUrl(null);
    setSelectedNames([]);
    setOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (price === null || quantity === null || imgUrl === null) {
      return;
    }
    // upload Image to cloudinary
    let coverPhoto = "";
    if (file) {
      dispatch(setLoading(true));
      try {
        coverPhoto = await uploadImage(file as File);
      } catch (error: any) {
        toast.error(error.message || "Error in uploading image");
        dispatch(setLoading(false));
        return;
      }
    }

    // request to backend for adding book
    const formData = {
      ...addBookForm,
      genres: selectedNames,
      coverPhoto,
    };
    if (!bookID) {
      return dispatch(addBook(formData as addBookPropsType))
        .unwrap()
        .then((res) => {
          toast.success("Book Added Successfully");
          book = res.data;
          dialogeCloseonAdd();
        });
    }
    dispatch(editBook({ bookID, body: formData }))
      .unwrap()
      .then((res) => {
        toast.success("Book Edited Successfully");
        book = res.data;
        handleDialogClose();
      });
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={handleSubmit}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                disabled={loading}
                onClick={handleDialogClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {bookID ? "Edit Book" : "Add new Book"}
              </Typography>
              <Button
                color="inherit"
                onClick={handleDialogClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                color="inherit"
                type="submit"
                disabled={loading}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>

          {/* Form to Add/Edit Book */}

          <Container maxWidth={"md"}>
            <Grid container p={2} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Title"
                  required
                  fullWidth
                  id="Title"
                  label="Title"
                  value={title}
                  disabled={loading}
                  onChange={(e) =>
                    setAddBookForm({ ...addBookForm, title: e.target.value })
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Author"
                  label="Author"
                  name="Author"
                  disabled={loading}
                  value={author}
                  onChange={(e) =>
                    setAddBookForm({ ...addBookForm, author: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="description"
                  name="description"
                  multiline
                  maxRows={4}
                  disabled={loading}
                  value={description}
                  onChange={(e) =>
                    setAddBookForm({
                      ...addBookForm,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="price"
                  label="price"
                  name="price"
                  disabled={loading}
                  value={price || ""}
                  onChange={(e) =>
                    setAddBookForm({
                      ...addBookForm,
                      price:
                        Number(e.target.value) > 0 ? Number(e.target.value) : 0,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="quantity"
                  label="quantity"
                  name="quantity"
                  disabled={loading}
                  value={quantity || ""}
                  onChange={(e) =>
                    setAddBookForm({
                      ...addBookForm,
                      quantity:
                        Number(e.target.value) > 0 ? Number(e.target.value) : 0,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>{"Genre *"}</InputLabel>
                  <Select
                    multiple
                    required
                    disabled={loading}
                    value={selectedNames}
                    onChange={(event) => {
                      if (event.target.value.length > 3) return;
                      setSelectedNames(event.target.value as string[]);
                    }}
                    input={<OutlinedInput label="genre" />}
                    renderValue={(selected) => (
                      <Stack gap={1} direction="row" flexWrap="wrap">
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            onDelete={() =>
                              setSelectedNames(
                                selectedNames.filter((item) => item !== value)
                              )
                            }
                            deleteIcon={
                              <Cancel
                                onMouseDown={(event) => event.stopPropagation()}
                              />
                            }
                          />
                        ))}
                      </Stack>
                    )}
                  >
                    {bookGenres.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        sx={{ justifyContent: "space-between" }}
                      >
                        {name}
                        {selectedNames.includes(name) ? (
                          <Check color="primary" />
                        ) : null}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    required={book ? false : true}
                    accept="image/*"
                    disabled={loading}
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>

              {imgUrl && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: 200,
                      width: "300px",
                    }}
                  >
                    <img
                      src={imgUrl || ""}
                      alt="book cover"
                      style={{
                        objectFit: "cover",
                        maxWidth: "300px",
                        //   height: "100%",
                      }}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

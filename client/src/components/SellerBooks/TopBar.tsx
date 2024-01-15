import {
  Add,
  Cancel,
  Check,
  Close,
  CloudUpload,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  MenuProps,
  OutlinedInput,
  Select,
  Slide,
  Stack,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { ChangeEvent, MouseEvent, forwardRef, useState } from "react";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSortMenu = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);

  const handleClickDailogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

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

  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        spacing={[1, 2]}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Books"
              size={sm ? "medium" : "small"}
              sx={{ width: { xs: "170px", md: "300px" }, bgcolor: "white" }}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Divider orientation="vertical" flexItem />
        <Button
          id="demo-customized-button"
          aria-controls={openSortMenu ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openSortMenu ? "true" : undefined}
          //   variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={sm && <KeyboardArrowDown />}
        >
          Sort By
        </Button>

        <Button
          variant="contained"
          endIcon={sm && <Add />}
          onClick={handleClickDailogOpen}
          size={sm ? "medium" : "small"}
        >
          Add Book
        </Button>

        {/* Menu */}
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={openSortMenu}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            Date: Newest First
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            Date: Oldest First
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            Name: A to Z
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            Name: Z to A
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            Price: Low to High
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            Price: High to Low
          </MenuItem>
        </StyledMenu>
        {/* Menu End */}
      </Stack>

      {/* ----------------------------------- */}
      {/* Add Book Dialogue */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add new Book
            </Typography>
            <Button color="inherit" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button autoFocus color="inherit" onClick={handleDialogClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        {/* Form to Add Book */}
        <form>
          <Container maxWidth={"md"}>
            <Grid container p={2} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Title"
                  required
                  fullWidth
                  id="Title"
                  label="Title"
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
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>{"Genre *"}</InputLabel>
                  <Select
                    multiple
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
                    accept="image/*"
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

export const bookGenres = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Horror",
  "Adventure",
  "Non-fiction",
  "Autobiography",
  "Science",
  "Self-help",
  "Philosophy",
  "Poetry",
  "Drama",
  "Comedy",
  "Children's",
  "Crime",
  "Classic",
  "Cooking",
  "Art",
  "History",
  "Religion",
  "Psychology",
  "other",
];

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

export default TopBar;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

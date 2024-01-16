import { Add, KeyboardArrowDown } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  TextField,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { setError } from "../../redux/auth/authSlice";
import { BookFormDialog } from "./BookFormDialog";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

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
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error]);

  const handleClickDailogOpen = () => {
    setOpen(true);
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
      <BookFormDialog open={open} setOpen={setOpen} />
    </>
  );
};

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

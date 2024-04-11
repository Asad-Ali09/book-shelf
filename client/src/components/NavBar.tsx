import { Sell, ShoppingCart } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import logoSrc from "../assets/logo-white.png";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { logout } from "../redux/auth/authServices";

interface NavBarProps {
  isClosing: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ isClosing, setMobileOpen }: NavBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems.length);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen((prev) => !prev);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn && (
        <>
          <MenuItem
            onClick={() => {
              handleMenuClose(), navigate("/profile/dashboard");
            }}
          >
            My account
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout();
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </>
      )}
      {!isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate("/login");
            handleMenuClose();
          }}
        >
          Login
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="sell books" color="inherit">
          <Sell />
        </IconButton>
        <p>Sell Books</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="shopping cart" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: { xs: 0, md: 2 }, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Stack
            direction={"row"}
            alignItems={"center"}
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            <Avatar sx={{ m: { xs: 0, md: 1 }, bgcolor: "inherit" }}>
              <img src={logoSrc} alt="Book-Shelf Logo" width={"100%"} />
            </Avatar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Book-Shelf
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            alignItems={"center"}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate("/profile/books")}
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            >
              Sell Books
            </Typography>

            <IconButton
              size="large"
              color="inherit"
              aria-label="shopping cart"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={cartItems} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

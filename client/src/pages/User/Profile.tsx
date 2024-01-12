import {
  AccountCircleOutlined,
  Dashboard,
  LibraryBooks,
  LocalShippingRounded,
  Logout,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";

interface ProfileProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile = ({ mobileOpen, setMobileOpen, setIsClosing }: ProfileProps) => {
  const drawerWidth = 240;

  const [selected, setSelected] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const index = drawerItems.findIndex(
      (item) => item.path === location.pathname
    );
    setSelected(index);
  }, [location]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const navigate = useNavigate();

  const drawerItems = [
    { name: "Dashboard", icon: <Dashboard />, path: "/profile/dashboard" },
    { name: "My Books", icon: <LibraryBooks />, path: "/profile/books" },
    { name: "Orders", icon: <LocalShippingRounded />, path: "/profile/orders" },
    {
      name: "Edit Profile",
      icon: <AccountCircleOutlined />,
      path: "/profile/edit",
    },
  ];

  const drawer = (
    <Stack height={"100%"} bgcolor={"white"}>
      <Toolbar />
      <Divider />

      <Stack justifyContent={"center"} py={4} spacing={1} alignItems={"center"}>
        <Avatar
          alt="Jhon Doe"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          sx={{ bgcolor: "primary.main", width: 56, height: 56 }}
        >
          <Typography variant="h5">J</Typography>
        </Avatar>
        <Typography>Jhon Doe</Typography>
      </Stack>

      <Divider />
      <List>
        {drawerItems.map((item, index) => (
          <ListItem
            sx={{
              bgcolor: index == selected ? "primary.main" : "inherit",
              color: index == selected ? "white" : "inherit",
              transition: "0.2s ease-out",
            }}
            key={index}
            disablePadding
            onClick={() => {
              navigate(item.path);
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button
        startIcon={<Logout />}
        variant="contained"
        sx={{ mt: "auto", borderRadius: 0 }}
      >
        Logout
      </Button>
    </Stack>
  );

  return (
    <Box display={"flex"} minHeight={"100vh"}>
      <SideBar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      >
        {drawer}
      </SideBar>
      <Box sx={{ flexGrow: 1 }} p={2}>
        <Toolbar />
        {/* All User Profile Routes will be displayed Here */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Profile;

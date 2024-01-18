import { Box, Drawer } from "@mui/material";

type SideBarPropsType = {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  children: JSX.Element;
  anchor?: "left" | "right" | "top" | "bottom";
};

const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  children,
  anchor,
}: SideBarPropsType) => {
  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: 0 }}
        boxShadow={3}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          anchor={anchor || "left"}
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {children}
        </Drawer>
        <Drawer
          anchor={anchor || "left"}
          variant="permanent"
          sx={{
            width: drawerWidth,
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {children}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;

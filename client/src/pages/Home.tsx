import { Box, Button, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Box
        height={"100vh"}
        sx={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(https://images.unsplash.com/photo-1481121749114-c5488c93b0d1?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <Toolbar />
        <Stack alignItems={"center"} justifyContent={"center"} height={"90%"}>
          <Button variant="contained">
            <Link to={"/store"} style={{ color: "inherit" }}>
              Go To Store
            </Link>
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Home;

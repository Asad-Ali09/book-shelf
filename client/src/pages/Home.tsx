import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Toolbar />
      <Link to={"/store"}>Store</Link>
    </>
  );
};

export default Home;

import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/User/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/User/DashBoard";
import OrdersCompleted from "./pages/User/OrdersCompleted";
import { useState } from "react";
import MyBooks from "./pages/User/MyBooks";
import Store from "./pages/Store";

axios.defaults.withCredentials = true;

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const sideBarProps = {
    mobileOpen,
    setIsClosing,
    setMobileOpen,
  };

  return (
    <>
      <BrowserRouter>
        <NavBar isClosing={isClosing} setMobileOpen={setMobileOpen} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={<Profile sideBarProps={sideBarProps} />}
          >
            <Route index element={<NotFound />} />
            <Route path="orders" element={<OrdersCompleted />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="books" element={<MyBooks />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="store" element={<Store sideBarProps={sideBarProps} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;

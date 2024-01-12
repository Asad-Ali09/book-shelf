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

axios.defaults.withCredentials = true;

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
            element={
              <>
                <Profile
                  mobileOpen={mobileOpen}
                  setIsClosing={setIsClosing}
                  setMobileOpen={setMobileOpen}
                />{" "}
              </>
            }
          >
            <Route index element={<NotFound />} />
            <Route path="orders" element={<OrdersCompleted />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;

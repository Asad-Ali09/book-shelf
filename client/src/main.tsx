import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import store from "./redux/store.ts";
import createTheme from "@mui/material/styles/createTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { alpha } from "@mui/material";

export const neutral = {
  50: "#F8F9FA",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D2D6DB",
  400: "#9DA4AE",
  500: "#6C737F",
  600: "#4D5761",
  700: "#2F3746",
  800: "#1C2536",
  900: "#111927",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF3536",
    },
    background: {
      // default: "#FFF5FF",
      default: "#f9fafb",
    },
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
    // divider: "#F2F4F7",
    divider: "#c1c9d5",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

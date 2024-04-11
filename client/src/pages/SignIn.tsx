import { CircularProgress, Link as MUILink, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logoSrc from "../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { loginUser } from "../redux/auth/authServices";
import { setError } from "../redux/auth/authSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MUILink color="inherit" href="https://mui.com/">
        Book-Shelf
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const initialState = {
  email: "",
  password: "",
};
export type FromDataType = typeof initialState;

export default function SignIn() {
  const [formData, setFormData] = useState<FromDataType>(initialState);
  const { email, password } = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, isLoggedIn } = useAppSelector((state) => state.auth);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(setError(null));
  }, [error, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      setFormData(initialState);
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "white" }}>
          <img src={logoSrc} alt="Book-Shelf Logo" width={"100%"} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            disabled={loading}
            value={email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            disabled={loading}
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <FormControlLabel
            disabled={loading}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography>Sign In</Typography>
              {loading && <CircularProgress color="inherit" size={20} />}
            </Stack>
          </Button>

          <Box>
            <Link to={"/signup"}>
              <Typography textAlign={"right"}>
                {"Don't have an account? Sign Up"}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

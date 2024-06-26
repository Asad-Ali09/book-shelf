/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FromDataType as LoginPropsType } from "../../pages/SignIn";
import { SignUpFormType as SignUpPropsType } from "../../pages/SignUp";
import axios from "axios";

const authURL = `${import.meta.env.VITE_SERVER_URL}/api/v1/auth`;

type loginReturnType = {
  message: string;
  data: IUser;
};

const loginUser = createAsyncThunk(
  "authSlice/loginUser",
  async (body: LoginPropsType, thunkAPI) => {
    try {
      const response = await axios.post<loginReturnType>(authURL, body);
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const signUp = createAsyncThunk(
  "authSlice/signUp",
  async (body: SignUpPropsType, thunkAPI) => {
    try {
      const response = await axios.post<loginReturnType>(
        `${authURL}/signup`,
        body
      );
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const logout = createAsyncThunk("authSlice/logout", async () => {
  await axios.get(`${authURL}`);
  localStorage.removeItem("user");
});

const isLoggedIn = async () => {
  try {
    const response = await axios.get<boolean>(`${authURL}/isloggedin`);
    return response.data;
  } catch (err: any) {
    return false;
  }
};

export { loginUser, signUp, logout, isLoggedIn };

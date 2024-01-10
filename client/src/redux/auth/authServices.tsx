import { createAsyncThunk } from "@reduxjs/toolkit";
import { FromDataType as LoginPropsType } from "../../pages/SignIn";
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

export { loginUser };

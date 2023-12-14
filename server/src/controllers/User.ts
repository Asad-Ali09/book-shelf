import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel";
import customError from "../error/customError";
import jwt from "jsonwebtoken";

//---- SignUP --------------------------------
const signUp = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    throw new customError(400, "Invalid email or password");
  }

  // Check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    throw new customError(400, "User already exists");
  }

  // Crete a new user
  const newUser = await User.create({ name, email, password });

  if (!newUser) {
    throw new customError(400, "Invalid user data");
  }

  const token = newUser.createJWT();
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400 * 3), // 3 Days
    sameSite: "none",
    secure: true,
  });

  const responseUser = newUser.toResponseObject();

  res
    .status(200)
    .json({ message: "Accound created successfully", data: responseUser });
};

//---- Login ----------------------------------------------------
const login = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;

  if (!password || !email) {
    throw new customError(400, "Invalid Credentials");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new customError(404, "Invalid Credentials");
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    throw new customError(400, "Invalid Credentials");
  }

  const token = user.createJWT();
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400 * 3),
    sameSite: "none",
    secure: true,
  });

  const responseUser = user.toResponseObject();
  res
    .status(200)
    .json({ message: "Logged In Successfully", data: responseUser });
};

//--- Logout ----------------------------------------------------------------
const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    expires: new Date(0),
    secure: true,
  });

  res.status(200).json({ message: "Logged Out Successfully" });
};

const isLoggedIn = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token || typeof token !== "string") {
    return res.status(200).json(false);
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!);
  if (!decodedToken) {
    return res.status(200).json(false);
  }
  return res.status(200).json(true);
};

export { signUp, login, logout, isLoggedIn };

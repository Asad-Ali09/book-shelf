import "express-async-errors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import UserRoute from "./routes/User";
import BookRoute from "./routes/Book";
import errorhandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";

const port = process.env.PORT || 5500;
const app = express();

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/books", BookRoute);

// Erro handling
app.use(errorhandler);
app.use(notFound);

// Connect to DataBase and listen server
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  })
  .catch((error) => console.error(error));

import "express-async-errors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const port = process.env.PORT || 5500;
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
};
start();

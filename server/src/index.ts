import "express-async-errors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import errorhandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";

const port = process.env.PORT || 5500;
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

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

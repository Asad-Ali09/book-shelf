import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getMyBooks,
  getSingleBook,
  updateBook,
} from "../controllers/Book";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use("/seller", authMiddleware);

router.route("/seller").get(getMyBooks).post(createBook);
router.route("/seller/:bookID").delete(deleteBook).put(updateBook);

router.route("/:bookID").get(getSingleBook);

router.route("/").get(getAllBooks);

export default router;

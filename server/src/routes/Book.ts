import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controllers/Book";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use("/seller", authMiddleware);

router.route("/seller").get(getAllBooks).post(createBook);
router.route("/seller/:bookID").delete(deleteBook).put(updateBook);

router.route("/:bookID").get(getSingleBook);

export default router;

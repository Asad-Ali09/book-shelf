import { Request, Response } from "express";
import Book from "../models/BookModel";
import customError from "../error/customError";
import { SortOrder } from "mongoose";

const createBook = async (req: Request, res: Response) => {
  const { title, description, coverPhoto, price, quantity, author, genres } =
    req.body;

  if (!title || !description || !coverPhoto || !price || !author) {
    throw new customError(400, "Please provide all required fields");
  }

  if (!genres || !Array.isArray(genres) || genres.length === 0)
    throw new customError(400, "Please provide at least one genre");

  if (
    (quantity && typeof quantity !== "number") ||
    (price && typeof price !== "number")
  )
    throw new customError(400, "Please provide valid data");

  const _quantity = quantity || 1;

  const newBook = await Book.create({
    title,
    description,
    coverPhoto,
    price,
    author,
    quantity: _quantity,
    seller: req.user?._id,
    genres,
  });

  return res
    .status(201)
    .json({ message: "Book created Successfully", data: newBook });
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const bookID = req.params.bookID;
  if (!bookID) throw new customError(400, "Please provide book id");

  const deletedBook = await Book.findByIdAndDelete(bookID);
  if (!deletedBook) {
    throw new customError(404, "Book not found");
  }

  res.status(200).json({ message: "Book removed successfully" });
};

const getMyBooks = async (req: Request, res: Response) => {
  const sellerID = req.user?._id;

  // sortBy (string) : createdAt, title, price, quantity
  // sortOrder (string) : asc, desc
  const { sortBy, sortOrder } = req.query;

  const sortOptions: { [key: string]: SortOrder } = {};

  const allowedSortFields = ["createdAt", "title", "price", "quantity"];
  if (sortBy && allowedSortFields.includes(sortBy as string)) {
    sortOptions[sortBy as string] = sortOrder === "desc" ? -1 : 1;
  } else {
    sortOptions["createdAt"] = -1;
  }

  const books = await Book.find({ seller: sellerID })
    .sort(sortOptions)
    .collation({ locale: "en", strength: 1 });

  res.status(200).json({ data: books });
};

const getSingleBook = async (req: Request, res: Response) => {
  const bookID = req.params.bookID;
  if (!bookID) throw new customError(400, "Please provide book id");

  const book = await Book.findOne({ _id: bookID }).populate(
    "author",
    "-password"
  );
  if (!book) {
    throw new customError(404, "Book not found");
  }
  res.status(200).json({ data: book });
};

const updateBook = async (req: Request, res: Response) => {
  const bookID = req.params.bookID;
  const authorID = req.user?._id;
  if (!bookID) throw new customError(400, "Please provide book id");

  const { title, description, coverPhoto, price, quantity } = req.body;

  if (
    (quantity && typeof quantity !== "number") ||
    (price && typeof price !== "number")
  )
    throw new customError(400, "Please provide valid data");

  const book = await Book.findOne({ _id: bookID, seller: authorID });
  if (!book) throw new customError(404, "Book not found");

  book.title = title || book.title;
  book.description = description || book.description;
  book.coverPhoto = coverPhoto || book.coverPhoto;
  book.price = price || book.price;
  book.quantity = quantity || book.quantity;

  const updatedBook = await book.save();
  res
    .status(200)
    .json({ message: "book updated successfully", data: updatedBook });
};

const getAllBooks = async (req: Request, res: Response) => {
  // TODO: improve the route to send books in chunks based on query params
  const data = await Book.find({})
    .sort({ createdAt: -1 })
    .populate("seller", "name email _id");
  res.status(200).json({ data });
};

export {
  createBook,
  updateBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  getMyBooks,
};

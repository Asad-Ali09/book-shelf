import { Request, Response } from "express";
import Book from "../models/BookModel";
import customError from "../error/customError";
import { SortOrder } from "mongoose";

const createBook = async (req: Request, res: Response) => {
  const { title, description, coverPhoto, price, quantity } = req.body;

  if (!title || !description || !coverPhoto || !price) {
    throw new customError(400, "Please provide all required fields");
  }

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
    author: req.user?._id,
    quantity: _quantity,
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
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.status(204).json({ message: "Book removed successfully" });
};

const getAllBooks = async (req: Request, res: Response) => {
  const authorID = req.user?._id;

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

  const books = await Book.find({ author: authorID })
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
    res.status(404).json({ error: "Book not found" });
    return;
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

  const book = await Book.findOne({ _id: bookID, author: authorID });
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

export { createBook, updateBook, getAllBooks, getSingleBook, deleteBook };

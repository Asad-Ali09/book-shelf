import { Request, Response } from "express";
import mongoose from "mongoose";
import customError from "../error/customError";
import BookModel, { IBook } from "../models/BookModel";
import Order, { bookObjType } from "../models/OrderModel";

const getAllRecievedOrders = async (req: Request, res: Response) => {
  const userID = req.user?._id;
  const orders = await Order.find({ seller: userID });
  res.status(200).json({ data: orders });
};

interface addNewOrderType extends Request {
  body: {
    books: {
      book: IBook["_id"];
      quantity: number;
    }[];
    shippingAddress: string;
    buyerName: string;
    shippingPrice: string;
  };
}

function compressMongooseId(mongooseId: mongoose.Types.ObjectId): string {
  const hexString = mongooseId.toHexString();
  const buffer = Buffer.from(hexString, "hex");
  const base64String = buffer.toString("base64");
  return base64String;
}

function decompressToMongooseId(
  compressedString: string
): mongoose.Types.ObjectId {
  const buffer = Buffer.from(compressedString, "base64");
  const hexString = buffer.toString("hex");
  const mongooseId = new mongoose.Types.ObjectId(hexString);
  return mongooseId;
}

const addNewOrder = async (req: addNewOrderType, res: Response) => {
  const { books, shippingAddress, buyerName, shippingPrice } = req.body;

  if (!shippingPrice || !buyerName || !shippingAddress) {
    throw new customError(400, "Please provide all required fields");
  }
  if (!books || !Array.isArray(books) || books.length === 0) {
    throw new customError(400, "Please provide at least one book");
  }

  const booksBySeller: Record<
    string,
    { book: bookObjType; quantity: number }[]
  > = {};

  for (const orderRequest of books) {
    const book = await BookModel.findById(orderRequest.book);
    if (!book) {
      throw new customError(404, "Book not found");
    }
    const sellerID: string = book.seller;

    const bookObj = {
      bookID: book._id,
      title: book.title,
      coverPhoto: book.coverPhoto,
      price: book.price,
      author: book.author,
    };

    if (!booksBySeller[sellerID]) {
      booksBySeller[sellerID] = [];
    }
    booksBySeller[sellerID].push({
      book: bookObj,
      quantity: orderRequest.quantity,
    });
  }

  const mergedBooks = Object.values(booksBySeller).flat();
  const sellerIDs = Object.keys(booksBySeller);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create a Customer Order. Store All Books

    const mergedItemsPrice = mergedBooks.reduce((acc, curr) => {
      return acc + curr.book.price * curr.quantity;
    }, 0);

    const customerOrder = await Order.create(
      [
        {
          books: mergedBooks,
          totalPrice: mergedItemsPrice + shippingPrice,
          shippingAddress,
          shippingPrice,
          buyerName,
          discriminator: "buyer",
        },
      ],
      { session: session }
    );

    // Create Orders for Sellers. Store the books ordered to each seller
    for (const sellerID of sellerIDs) {
      const sellerBooks = booksBySeller[sellerID];
      const itemsPrice = sellerBooks.reduce((acc, curr) => {
        return acc + curr.book.price * curr.quantity;
      }, 0);
      // Save to Db
      await Order.create(
        [
          {
            books: sellerBooks,
            totalPrice: itemsPrice,
            shippingAddress,
            buyerName,
            seller: sellerID,
            discriminator: "seller",
            linkedTo: customerOrder[0]._id,
          },
        ],
        { session: session }
      );
    }

    const trackingID = compressMongooseId(customerOrder[0]._id);

    await session.commitTransaction();
    return res
      .status(201)
      .json({ data: trackingID, message: "Order placed successfully" });
  } catch (error: any) {
    await session.abortTransaction();
    throw new customError(500, error.message || "Something went wrong");
  } finally {
    session.endSession();
  }
};

type orderBookType = {
  book: bookObjType;
  quantity: number;
  status: "pending" | "completed" | "cancelled";
};

const updateStatusofBooks = (
  orignalBooks: orderBookType[],
  orderedBooks: orderBookType[],
  status: "cancelled" | "completed"
) => {
  const statusMap: Record<string, typeof status> = {};
  for (const orderedBook of orderedBooks) {
    statusMap[orderedBook.book.bookID.toString()] = status;
  }

  orignalBooks = orignalBooks.map((orderedBook) => {
    const updatedStatus = statusMap[orderedBook.book.bookID.toString()];
    if (updatedStatus) {
      return { ...orderedBook, status: updatedStatus };
    }
    return orderedBook;
  });
  return orignalBooks;
};

const cancelOrder = async (req: Request, res: Response) => {
  const { id: orderID } = req.params;
  const sellerID = req.user._id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findOne({
      seller: sellerID,
      _id: orderID,
    }).session(session);
    if (!order) {
      throw new customError(404, "Order not found");
    }

    if (order.status !== "pending") {
      throw new customError(400, "Order is not pending");
    }

    // Cancel books on customer Order
    const customerOrder = await Order.findOne({
      discriminator: "buyer",
      _id: order.linkedTo,
    }).session(session);
    if (!customerOrder) {
      throw new customError(404, "Order not found...");
    }

    customerOrder.books = updateStatusofBooks(
      customerOrder.books,
      order.books,
      "cancelled"
    );

    // Cancel Order on Seller Order
    order.status = "cancelled";

    // Validate and Save
    await Promise.all([customerOrder.validate(), order.validate()]);
    await Promise.all([customerOrder.save(), order.save()]);

    await session.commitTransaction();
    return res.status(200).json({ message: "Order Cancelled Successfully" });
  } catch (error: any) {
    await session.abortTransaction();
    const status =
      typeof error.statusCode === "number" ? error.statusCode : 500;
    throw new customError(status, error.message || "Something went wrong");
  } finally {
    session.endSession();
  }
};

const completeOrder = async (req: Request, res: Response) => {
  const { id: orderID } = req.params;
  const sellerID = req.user._id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(orderID).session(session);
    if (!order) throw new customError(404, "Order not found");

    if (order.status !== "pending")
      throw new customError(400, "Order is not pending");
    const customerOrder = await Order.findOne({
      _id: order.linkedTo,
      discriminator: "buyer",
    }).session(session);
    if (!customerOrder) throw new customError(404, "Order not found");

    for (const orderData of order.books) {
      const myBook = await BookModel.findOne({
        seller: sellerID,
        _id: orderData.book.bookID,
      });
      if (!myBook) throw new Error("Book not found");
      if (myBook.quantity < orderData.quantity)
        throw new Error("Book quantity is not enough");

      myBook.quantity -= orderData.quantity;
      await myBook.save();
    }

    customerOrder.books = updateStatusofBooks(
      customerOrder.books,
      order.books,
      "completed"
    );

    order.status = "completed";

    await Promise.all([customerOrder.validate(), order.validate()]);
    await Promise.all([customerOrder.save(), order.save()]);

    await session.commitTransaction();
    return res.status(200).json({ message: "Order completed successfully" });
  } catch (error: any) {
    session.abortTransaction();
    const status =
      typeof error.statusCode === "number" ? error.statusCode : 500;
    throw new customError(status, error.message || "Something went wrong");
  } finally {
    session.endSession();
  }
};

const trackOrder = async (req: Request, res: Response) => {
  const { id: trackingID } = req.params;
  const orderID = decompressToMongooseId(trackingID);
  const order = await Order.findOne({ _id: orderID, discriminator: "buyer" });
  if (!order) throw new customError(404, "Order not found");
  return res.status(200).json({ data: order });
};

export {
  addNewOrder,
  cancelOrder,
  completeOrder,
  getAllRecievedOrders,
  trackOrder,
};

import { Router } from "express";
import {
  addNewOrder,
  cancelOrder,
  completeOrder,
  getAllRecievedOrders,
  trackOrder,
} from "../controllers/Order";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.route("/").get(authMiddleware, getAllRecievedOrders).post(addNewOrder);
router
  .route("/:id")
  .put(authMiddleware, completeOrder)
  .delete(authMiddleware, cancelOrder);

router.get("/track/:id", trackOrder);
export default router;

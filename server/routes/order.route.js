// routes/order.js

import express from "express";
import {
  getCheckoutSession,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/order.controller.js";
import Authenticate from "../middlewares/auhinticate.js";

const orderRouter = express.Router();

orderRouter.post("/checkout-session", Authenticate(), getCheckoutSession);
orderRouter.get("/", Authenticate(), getAllOrders);
orderRouter.get("/:id", Authenticate(), getOrderById);
orderRouter.delete("/:id", Authenticate(), deleteOrder);
orderRouter.patch("/:id", Authenticate(), updateOrder);

export default orderRouter;

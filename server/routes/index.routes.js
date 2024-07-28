import { Router } from "express";
import userRouter from "../routes/user.route.js";
import productsRouter from "../routes/products.route.js";
import categoryRouter from "../routes/category.route.js";
import orderRouter from "./order.route.js";
const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/products", productsRouter);
indexRouter.use("/category", categoryRouter);
indexRouter.use("/orders", orderRouter);

export default indexRouter;

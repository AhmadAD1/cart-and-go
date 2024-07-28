import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
} from "../controllers/product.controller.js";
import uploadFiles from "../middlewares/uploadFile.js";
import Authenticate from "../middlewares/auhinticate.js";

const productsRouter = express.Router();

productsRouter.use(uploadFiles);
productsRouter.post("/",Authenticate(true), createProduct);
productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/:productId/addReview", Authenticate(), addReview);
productsRouter.patch("/:id", Authenticate(true),updateProduct);
productsRouter.delete("/:id", Authenticate(true),deleteProduct);

export default productsRouter;

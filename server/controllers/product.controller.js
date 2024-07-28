import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { PAGINATIONCOUNT } from "../config/variables.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProduct = async (req, res) => {
  try {
    const { files } = req;
    const { name, description, price, category, brand, stock, images } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const newProduct = new Product({ name, description, price, category, brand, stock, images });
    if (files?.image?.length > 0) {
      newProduct.image = files?.image[0]?.filename;
    }
    await newProduct.save();
    res.send(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { query } = req;
    const search = {};

    if (query.name) {
      search.name = { $regex: query.name, $options: "i" };
    }
    if (query.category) {
      search.category = query.category;
    }

    if (query.priceFrom && query.priceTo) {
      search.price = { $gte: parseInt(query.priceFrom), $lte: parseInt(query.priceTo) };
    }

    const count = await Product.countDocuments(search);
    const products = await Product.find(search, null, {
      skip: query.page ? parseInt(query.page) * 40 : null,
      limit: query.page ? 40 : null,
    });

    res.status(200).json({ products, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findAllProducts = async (req, res, next) => {
  try {
    const { query } = req;
    const search = {};
    query.name ? (search.name = { $regex: query.name, $options: "i" }) : null;
    query.description ? (search.description = { $regex: query.description, $options: "i" }) : null;
    query.categories ? (search.category = { $in: query.categories.split(",") }) : null;
    query.tags ? (search.tags = { $in: query.tags.split(",").map((tag) => new RegExp(tag, "i")) }) : null;
    query.plan ? (search["plans.name"] = { $regex: query.plan, $options: "i" }) : null;
    query.type ? (search.type = query.type) : null;
    const count = await Product.countDocuments(search);
    const products = await Product.find(search, null, {
      skip: query.page ? parseInt(query.page) * PAGINATIONCOUNT : null,
      limit: query.page ? PAGINATIONCOUNT : null,
    });
    res.send({ products, count });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category reviews.user");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, images } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    if (req.files?.image?.length > 0) {
      // Delete the old image if it exists
      if (product.image) {
        const oldImagePath = path.join(__dirname, "..", "uploads", product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update with the new image
      product.image = req.files?.image[0]?.filename;
    }

    await product.save({ validateModifiedOnly: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the product's image if it exists
    if (product.image) {
      const oldImagePath = path.join(__dirname, "..", "uploads", product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const userId = req.user.id;

    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const existingReviewIndex = product.reviews.findIndex((review) => review.user.toString() === userId.toString());

    if (existingReviewIndex !== -1) {
      product.reviews[existingReviewIndex].rating = rating;
      product.reviews[existingReviewIndex].comment = comment;
    } else {
      product.reviews.push({ user: userId, rating, comment });
      product.numOfReviews += 1;
    }

    const sumRatings = product.reviews.reduce((total, review) => total + review.rating, 0);
    product.ratings = sumRatings / product.reviews.length;

    product = await product.save();

    res.send({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

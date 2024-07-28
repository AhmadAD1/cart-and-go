import Stripe from "stripe";
import Product from "../models/Product.js";
import { clientUrl, PAGINATIONCOUNT, stripeSecretKey } from "../config/variables.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Create Checkout Session and Order
export const getCheckoutSession = async (req, res) => {
  const { orderItems } = req.body;
  try {
    const user = await User.findById(req.user);

    const stripe = new Stripe(stripeSecretKey);

    const lineItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item._id);
        const productImg = `http://localhost:8080/${product.image}`;
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [productImg],
            },
            unit_amount: product.price * 100,
          },
          quantity: item.count,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${clientUrl}/checkout-success`,
      cancel_url: `${clientUrl}`,
      customer_email: user.email,
      client_reference_id: req.params.productId,
      line_items: lineItems,
    });

    const orderProducts = orderItems.map((item) => ({
      product: item._id,
      quantity: item.count,
      price: item.price,
    }));

    const order = new Order({
      orderItems: orderProducts,
      user: user._id,
      price: lineItems.reduce((total, item) => total + item.price_data.unit_amount * item.quantity, 0) / 100,
      session: session.id,
    });
    await order.save();
    res.send(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Orders
export const getAllOrders = async (req, res) => {
  const { query } = req;
  try {
    let search = {};
    if (query.id) {
      if (!mongoose.Types.ObjectId.isValid(query.id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      search._id = query.id;
    }

    const count = await Order.countDocuments(search);
    const orders = await Order.find(search, null, {
      skip: query.page ? parseInt(query.page) * PAGINATIONCOUNT : 0,
      limit: query.page ? PAGINATIONCOUNT : 0,
    })
      .populate("user")
      .populate("orderItems.product")
      .select("-session");

    res.json({ orders, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("orderItems.product")
      .select("-session");
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    Object.keys(req.body).forEach((key) => {
      order[key] = req.body[key];
    });
    await order.save({ validateModifiedOnly: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

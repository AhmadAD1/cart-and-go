import { fileURLToPath } from "url";
import { PAGINATIONCOUNT } from "../config/variables.js";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (req, res) => {
  const { username, fullName, email, password, role, country, city } = req.body;
  if (!fullName) {
    return res.status(400).json({ message: "fullName is required" });
  }
  if (await User.findOne({ username })) {
    return res.status(400).json({ message: "username already in use" });
  }

  try {
    const user = new User({
      username,
      fullName,
      email,
      password,
      role,
      country,
      city,
    });
    if (req.files?.image?.length > 0) {
      user.photo = req.files?.image[0]?.filename;
    }
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required!" });
  }
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username or Password!" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Username or Password!" });
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message, error: error });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  const { query } = req;
  try {
    const search = {};
    query.username ? (search.username = { $regex: query.username, $options: "i" }) : null;
    const count = await User.countDocuments(search);
    const users = await User.find(search, null, {
      skip: query.page ? parseInt(query.page) * PAGINATIONCOUNT : null,
      limit: query.page ? PAGINATIONCOUNT : null,
    });
    res.status(200).json({ users, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { username, fullName, email, role, country, city, rating } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    if (req.files?.image?.length > 0) {
      // Delete the old image if it exists
      if (user.photo) {
        const oldImagePath = path.join(__dirname, "..", "uploads", user.photo);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update with the new image
      user.photo = req.files?.image[0]?.filename;
    }

    await user.save({ validateModifiedOnly: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user's image if it exists
    if (user.photo) {
      const oldImagePath = path.join(__dirname, "..", "uploads", user.photo);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email is already subscribed
    let existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    // Create new subscription record
    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const subscribers = async (req, res) => {
  try {
    const subscribers = await Subscription.find({});
    res.send(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res, next) => {
  const { id } = req.user;
  const keys = ["email", "fullName"];
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(createError("user not found!", 404));
    }

    Object.keys(req.body).forEach((key) => {
      if (keys.includes(key)) user[key] = req.body[key];
    });

    await user.validate();

    if (req.files?.image?.length > 0) {
      // Delete the old image if it exists
      if (user.photo) {
        const oldImagePath = path.join(__dirname, "..", "uploads", user.photo);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update with the new image
      user.photo = req.files?.image[0]?.filename;
    }

    await user.save({ validateModifiedOnly: true });

    res.send(user);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

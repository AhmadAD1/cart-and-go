import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regular expression for strong passwords
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      validate: {
        validator: function (value) {
          return passwordRegex.test(value);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    role: {
      type: String,
      enum: ["superadmin", "user"],
      default: "user",
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    photo: String,
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Hash the password before saving and updating
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
        role: this.role,
        username: this.username,
      },
      JWT_SECRET
    );
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.method("toJSON", function () {
  const user = this.toObject();
  delete user.password;
  return user;
});
export const createAdminUserIfNotExist = async () => {
  try {
    const user = await User.findOne({
      role: "superadmin",
      email: "admin@gmail.com",
      username: "admin",
    });

    if (!user) {
      const admin = new User({
        name: "admin",
        email: "admin@gmail.com", // Please change this to a real one & also who in findOne line above
        username: "admin",
        password: "Admin@1234",
        fullName: "Super Admin",
        role: "superadmin",
      });

      await admin.save();
    }
  } catch (err) {
    throw new Error(err);
  }
};

const User = model("User", userSchema);

export default User;

// models/Subscription.js
import { model, Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Subscription = model("Subscription", subscriptionSchema);
export default Subscription;

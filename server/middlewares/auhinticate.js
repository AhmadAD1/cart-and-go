import { JWT_SECRET } from "../config.js";
import { jwtSecret } from "../config/variables.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const Authenticate =
  (adminOnly = false, allowGuest = false) =>
  async (req, res, next) => {
    try {
      const auth_token = req.get("Authorization");

      if (!auth_token && allowGuest) {
        return next();
      }

      if (!auth_token) {
        return res.status(403).json({ message: "Please Login!" });
      }

      const token = auth_token.replace("Bearer ", "");
      jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token", err });
        }
        const user = await User.findById(decoded._id);
        if (!user) {
          return res.status(404).json({ message: "user not found" });
        }
        if (adminOnly && user.role !== "superadmin") {
          return res.status(403).json({ message: "Unauthorized Access" });
        }
        req.user = user;
        req.token = token;
        next();
      });
    } catch (err) {
      next(err);
    }
  };

export default Authenticate;

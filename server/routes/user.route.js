import { Router } from "express";
import {
  register,
  login,
  getUser,
  subscribe,
  getUsers,
  updateUser,
  deleteUser,
  updateProfile,
  subscribers,
} from "../controllers/user.controller.js";
import uploadFiles from "../middlewares/uploadFile.js";
import Authenticate from "../middlewares/auhinticate.js";
const userRouter = Router();
userRouter.post("/subscribe", subscribe);
userRouter.use(uploadFiles);
userRouter.get("/subscribers", Authenticate(true), subscribers);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/:id", getUser);
userRouter.get("/", getUsers);
userRouter.patch("/updateProfile", Authenticate(), updateProfile);
userRouter.patch("/:id", Authenticate(true), updateUser);
userRouter.delete("/:id", Authenticate(true), deleteUser);

export default userRouter;

import { Router } from "express";
import {
  loginUser,
  logout,
  myProfile,
  registerUser,
  updateUser,
} from "../controller/userController.js";
import { isLogin } from "../middleware/isLogin.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logout);
userRouter.get("/me", isLogin, myProfile);
userRouter.put("/update", isLogin, updateUser);

export default userRouter;

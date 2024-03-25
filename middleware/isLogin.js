import jwt from "jsonwebtoken";
import { jwtSecret } from "../secret/secret.js";
import User from "../models/userModel.js";

export const isLogin = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw Error("Token not found");
    }
    const userInfo = jwt.verify(token, jwtSecret);
    if (!userInfo) {
      throw Error("Jwt token not found");
    }
    const user = await User.findById(userInfo.userId).select("-password");
    if (!user) {
      throw Error("User not find with this Id");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

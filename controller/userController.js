import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../secret/secret.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      throw Error("Name is required");
    }
    if (!email) {
      throw Error("Email is required");
    }
    if (!password || password.length < 6) {
      throw Error("Password is required and 6 character long");
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw Error("User already exists with this email");
    }
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });

    return res.status(201).json({
      success: true,
      message: "Registration Successfull",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw Error("Email is required");
    }
    if (!password) {
      throw Error("Password is required");
    }
    const existingUser = await User.findOne({
      email: email,
    });
    if (!existingUser) {
      throw Error("User not found, please create an account");
    }

    const comparePassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      throw Error("Password not matched");
    }
    const token = jwt.sign({ userId: existingUser.id }, jwtSecret, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3day
      httpOnly: true,
      // secure: true,  // this option is only true in production
      sameSite: "none",
    });
    const user = await User.findById(existingUser.id).select("-password");

    await user.save();
    return res.status(201).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
    });

    return res.status(201).json({
      success: true,
      message: "Logout successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const myProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw Error("User not found");
    }
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, password, avatar } = req.body;
    const user = {};
    if (name) {
      user.name = name;
    }
    if (password) {
      if (password.length < 6) {
        throw Error("Password required atlist 6 character");
      }
      user.password = password;
    }
    if (avatar) {
      user.avatar = avatar;
    }
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      throw Error("Error in finding user");
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

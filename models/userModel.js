import mongoose from "mongoose"
import bcryptjs from "bcryptjs";
import { readImageFile } from "../config/imageFIleReader.js";

const defaultAvatarPath = "./assets/images/pngegg.png"
const defaultAvatar = readImageFile(defaultAvatarPath);

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Name is required"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required:[true, "Password is required"],
        trim: true,
        min:6,
        max:30,
        set: (v) => bcryptjs.hashSync(v, bcryptjs.genSaltSync(10)),
    },
    role:{
        type: String,
        default: "user"
    },
    avatar:{
      type: String,
      default: defaultAvatar
    }
},{timestamps: true})

const User = mongoose.model("Users", userSchema);

export default User
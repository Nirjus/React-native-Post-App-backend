import { Router } from "express";
import { isLogin } from "../middleware/isLogin.js";
import {
  deletePost,
  getAllPostOfUser,
  getPosts,
  postCreate,
  updatePost,
} from "../controller/postController.js";

const postRouter = Router();

postRouter.post("/create", isLogin, postCreate);
postRouter.get("/getAll-post", isLogin, getAllPostOfUser);

postRouter.get("/getPosts", getPosts);
postRouter.put("/update/:id", isLogin, updatePost);
postRouter.delete("/delete/:id", isLogin, deletePost);

export default postRouter;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tittle is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

export default Post;

import Post from "../models/postModels.js";

export const postCreate = async (req, res, next) => {
  try {
    const id = req.user.id;

    const { title, description } = req.body;
    if (!title) {
      throw Error("Title is required");
    }
    if (!description) {
      throw Error("Description is required");
    }

    const post = await Post.create({
      title: title,
      description: description,
      postedBy: id,
    });
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPostOfUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const posts = await Post.find({ postedBy: id }).sort({ createdAt: -1 });
    if (!posts) {
      return res.status(200).send({
        success: true,
        message: "You Dont have any post right now",
      });
    }
    return res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });

    return res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      throw Error("Please provide title or description");
    }
    const updatedPost = {};
    if (title) {
      updatedPost.title = title;
    }
    if (description) {
      updatedPost.description = description;
    }
    const post = await Post.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    return res.status(201).json({
      success: true,
      message: "Post updated successful",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw Error("User not found");
    }
    const { id } = req.params;

    await Post.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Your post has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

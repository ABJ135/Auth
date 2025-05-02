const Post = require("../model/post.model");
const User = require("../model/user.model");
const Category = require("../model/category.model");

const createPost = async (req, res) => {
  try {
    const { title, content, userId, categoryId } = req.body;

    if (!title || !content || !userId || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findByPk(userId);               
    const category = await Category.findByPk(categoryId);

    if (!user || !category) {
      return res.status(404).json({ message: "User or Category not found" });
    }

    const post = await Post.create({ title, content, userId, categoryId });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Category, attributes: ["id", "name"] },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Category, attributes: ["id", "name"] },
      ],
    });

    
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const post = await Post.findByPk(id);
    

    await post.update(updates);
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

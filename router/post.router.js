const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");
const auth = require("../auth/jetAuth");

router.post("/createPost", auth, postController.createPost);
router.get("/getPosts", auth, postController.getAllPosts);
router.get("/getPost/:id", auth, postController.getPostById);
router.put("/updatePost/:id", auth, postController.updatePost);
router.delete("/deletePost/:id", auth, postController.deletePost);

module.exports = router;

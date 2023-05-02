const express = require("express");
const { PostModel } = require("../model/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let postRoute = express.Router();

postRoute.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (error) {
    res.send({ message: "error" });
  }
});

postRoute.post("/", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.send(post);
  } catch (error) {
    console.error(error);
    res.send({ message: "error" });
  }
});

postRoute.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const post = await PostModel.findByIdAndUpdate(id, payload);
    res.send(post);
  } catch (error) {
    res.send({ message: "error" });
  }
});

postRoute.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    res.send({ message: "error" });
  }
});

postRoute.post("/:id/like", async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  try {
    if (post.likes.includes(req.body.user)) {
      return res.send({ message: "already liked" });
    }
    post.likes.push(req.body.user);
    const likePost = await post.save();
    res.send(likePost);
  } catch (err) {
    res.send({ message: "err" });
  }
});

postRoute.post('/:id/comment', async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    const comment = {
      user: req.body.user,
      text: req.body.text,
      createdAt: new Date()
    };
    try {
        post.comments.push(comment);
        const commentpost = await post.save();
        res.send(comment);
    } catch (err) {
      res.send({ message: "err"});
    }
});

postRoute.get('/:id', async (req, res) => {
    try {
      const posts = await PostModel.find().populate('user likes comments.user');
      res.send(posts);
    } catch (error) {
      res.send({ message: "err" });
    }
});

module.exports = { postRoute };

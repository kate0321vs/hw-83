import express from "express";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../middleware/multer";
import mongoose from "mongoose";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
    try {
        const response = await Post.find().populate("user", "username").sort({createdAt: -1});
        res.send(response);
    } catch (e) {
        res.status(500).send(e);
    }
});

postsRouter.get("/:id", async (req, res) => {
    try {
        const response = await Post.findById(req.params.id);
        if (!response) {
             res.status(404).send({error: "Post not found"});
            return
        }
        res.send(response);
    } catch (e) {
        res.status(500).send(e);
    }
});

postsRouter.post("/", auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const newPost = new Post({
            user: user._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? 'images/' + req.file.filename : null,
            date: new Date(),
        });
        await newPost.save();
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e.message);
        }
        next(e)
    }

})


export default postsRouter


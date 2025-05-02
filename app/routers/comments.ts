import express from "express";
import Comment from "../models/Comment";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
    try {
        const {id_post} = req.query;
        let comments;
        if (id_post) {
            comments = await Comment.find({post: id_post}).populate("user", "username").sort({createdAt: -1});
        } else {
            comments = await Comment.find().populate("user", "username").sort({createdAt: -1})
        }
        res.send(comments);
    } catch (e) {
        res.status(500).send(e);
    }
});

commentsRouter.post("/", auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const newComment = new Comment({
            post: req.body.post,
            user: user._id,
            text: req.body.text,
        });
        await newComment.save();
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e.message)
        }
        next(e);
    }
});

export default commentsRouter
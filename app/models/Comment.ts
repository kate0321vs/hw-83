import {model, Schema, Types} from "mongoose";
import User from "./User";
import Post from "./Post";

const CommentSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "User not found",
        }
    },
    post: {
        type: Types.ObjectId,
        ref: "Post",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const post = await Post.findById(value);
                return !!post;
            },
            message: "Post not found",
        }
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

const Comment = model('Comment', CommentSchema);
export default Comment;
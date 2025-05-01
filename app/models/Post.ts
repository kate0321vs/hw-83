import {HydratedDocument, model, Schema, Types} from "mongoose";
import User from "./User";
import {IPost} from "../types";

const PostSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "Post not found",
        }
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        validate: {
            validator: async function (this: HydratedDocument<IPost>)  {
                return Boolean(!this.image && !this.description);
            },
            message: 'Input description or image is required'
        }
    },
    image: {
        type: String,
        validate: {
            validator: function (this: HydratedDocument<IPost>)  {
                return Boolean(!this.image && !this.description);
            },
            message: 'Input description or image is required'
        }
    }
});

const Post = model('Post', PostSchema);
export default Post;
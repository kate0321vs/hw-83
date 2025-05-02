import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPost, IPostMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const fetchPosts = createAsyncThunk<IPost[]>(
    "posts/fetchAll",
    async () => {
        const response = await axiosApi('/posts');
        return response.data;
    }
);

export const fetchOnePost = createAsyncThunk<IPost, string>(
    "posts/fetchOne",
    async (id) => {
        const response = await axiosApi(`/posts/${id}`)
        return response.data;
    }
);

export const createPosts = createAsyncThunk<void, IPostMutation, { state: RootState }>(
    "posts/createPosts",
    async (post, thunkAPI) => {
        const usersState = thunkAPI.getState().users;
        const formData = new FormData();
        const keys = Object.keys(post) as (keyof IPostMutation)[];

        keys.forEach((key) => {
            const value = post[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post("/posts",
            formData,
            {
                headers: {
                    "Authorization": usersState.user?.token,
                }
            });
    }
)
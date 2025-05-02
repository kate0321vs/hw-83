import {IPost} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createPosts, fetchOnePost, fetchPosts} from "./postsThunk.ts";

interface PostsState {
    posts: IPost[];
    post: IPost | null;
    fetchPostsLoading: boolean;
    fetchPostLoading: boolean;
    createLoading: boolean;
}

const initialState: PostsState = {
    posts: [],
    post: null,
    fetchPostsLoading: false,
    fetchPostLoading: false,
    createLoading: false,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.fetchPostsLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
            state.fetchPostsLoading = false;
            state.posts = posts
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.fetchPostsLoading = false;
        });

        builder.addCase(fetchOnePost.pending, (state) => {
            state.fetchPostLoading = true;
        });
        builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
            state.fetchPostLoading = false;
            state.post = post;
        });
        builder.addCase(fetchOnePost.rejected, (state) => {
            state.fetchPostLoading = false;
        });

        builder.addCase(createPosts.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createPosts.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createPosts.rejected, (state) => {
            state.createLoading = false;
        });
    }
});


export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.post;
export const selectPostsLoading = (state: RootState) => state.posts.fetchPostsLoading;
export const selectPostLoading = (state: RootState) => state.posts.fetchPostLoading;
export const selectCreatePostLoading = (state: RootState) => state.posts.createLoading;
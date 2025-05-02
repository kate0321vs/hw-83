import { useEffect } from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectPosts, selectPostsLoading} from "./postsSlice.ts";
import {fetchPosts} from "./postsThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import PostItem from "./components/PostItem.tsx";
import {Typography} from "@mui/material";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectPostsLoading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <>
            {loading ?
                <Spinner /> :
                posts ?
                    (<>
                            {posts.map((post) => (
                       <PostItem key={post._id} image={post.image} title={post.title} date={post.date} id={post._id} user={post.user.username} />
                       ))} </>)
                    : <Typography>No posts yet</Typography>
            }
        </>
    );
};

export default Posts;
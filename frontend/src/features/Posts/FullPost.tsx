import {Container, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { useParams } from "react-router-dom";
import {useEffect} from "react";
import dayjs from "dayjs";
import {selectPost} from "./postsSlice.ts";
import {fetchOnePost} from "./postsThunk.ts";
import {fetchComments} from "../Comments/CommentsThunk.ts";
import Comments from "../Comments/Comments.tsx";


const FullPost = () => {
    const dispatch = useAppDispatch();
    const oneFullPost = useAppSelector(selectPost);
    const { id_post } = useParams() as { id_post: string };

    console.log(oneFullPost);

    useEffect(() => {
        dispatch(fetchOnePost(id_post));
        dispatch(fetchComments(id_post));
    }, [dispatch, id_post]);

    return (
        <>
            {oneFullPost ? (
                <Container>
                    <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1, }}>
                        {oneFullPost?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        At {dayjs(oneFullPost?.date).format("DD.MM.YYYY HH:mm")} by {oneFullPost.user.username}
                    </Typography>
                    <Typography component="p">
                        {oneFullPost?.description}
                    </Typography>
                    <Comments/>
                </Container>
            ) : <p>Not Found</p> }
        </>

    );
};

export default FullPost;

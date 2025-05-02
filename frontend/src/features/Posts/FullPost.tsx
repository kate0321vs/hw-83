import {Box, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { useParams } from "react-router-dom";
import {useEffect} from "react";
import dayjs from "dayjs";
import {selectPost, selectPostLoading} from "./postsSlice.ts";
import {fetchOnePost} from "./postsThunk.ts";
import {fetchComments} from "../Comments/CommentsThunk.ts";
import Comments from "../Comments/Comments.tsx";
import CommentForm from "../Comments/components/CommentForm.tsx";
import {baseURL} from "../../globalConstants.ts";
import Grid from "@mui/material/Grid";
import {selectUser} from "../Users/usersSlice.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const FullPost = () => {
    const dispatch = useAppDispatch();
    const oneFullPost = useAppSelector(selectPost);
    const { id_post } = useParams() as { id_post: string };
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectPostLoading);

    useEffect(() => {
        dispatch(fetchOnePost(id_post));
        dispatch(fetchComments(id_post));
    }, [dispatch, id_post]);

    return (
        <>
            {loading ?
                <Spinner/> :
                oneFullPost ? (
                <Box maxWidth="md">
                    <Grid direction='row' >
                    {oneFullPost.image && (
                        <Grid size={6} sx={{ mb: 2 }}>
                            <img
                                src={baseURL + '/' + oneFullPost.image}
                                alt={oneFullPost.title}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </Grid>
                    )}
                    <Grid>
                        <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1, }}>
                            {oneFullPost?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            At {dayjs(oneFullPost?.date).format("DD.MM.YYYY HH:mm")} by {oneFullPost.user.username}
                        </Typography>
                        <Typography component="p">
                            {oneFullPost?.description}
                        </Typography>
                    </Grid>
                        {user && <CommentForm id_post={id_post} />}
                    <Comments/>
                    </Grid>
                </Box>
            ) : <p>Not Found</p> }
        </>

    );
};

export default FullPost;

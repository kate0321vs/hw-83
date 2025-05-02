import {Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { useAppSelector} from "../../app/hooks.ts";
import {selectComments, selectFetchCommentsLoading} from "./CommentsSlice.ts";
import CommentItem from "./components/CommentItem.tsx";


const Comments = () => {
    const comments = useAppSelector(selectComments);
    const loading = useAppSelector(selectFetchCommentsLoading);


    return (
        <>
            <Typography variant="h5" component="div" sx={{mb: 1, mt: 3 }}>
                Comments
            </Typography>
            {loading ? <Spinner/>
                : (comments.length > 0 ?
                    comments.map((comment) => (
                        <CommentItem key={comment._id} author={comment.user.username} text={comment.text} date={comment.date} />
                    )) :
                    <Typography>No comments yet</Typography>)
            }
        </>
    );
};

export default Comments;
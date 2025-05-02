import React, { useState } from "react";
import {Button, CircularProgress, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import {ICommentMutation} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {createComments, fetchComments} from "../CommentsThunk";
import {selectCreateCommentLoading} from "../CommentsSlice.ts";
import SendIcon from "@mui/icons-material/Send";


interface Props{
    id_post: string
}

const CommentForm: React.FC <Props> = ({id_post}) => {
    const initialState: ICommentMutation ={
        text: '',
        post: id_post,
    }
    const loading = useAppSelector(selectCreateCommentLoading);
    const [state, setState] = useState<ICommentMutation>({...initialState});
    const dispatch = useAppDispatch();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setState((prev) => ({...prev, [name]: value}));
    }

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (state.text.trim() === "") {
            alert("Please enter text");
            return;
        }
        await dispatch(createComments(state))
        await dispatch(fetchComments(id_post))
        setState(initialState);
    };

    return (
        <>
            <Typography variant="h5" sx ={{ marginBottom: 2, mt: 4}} component="h1">
                Add comment
            </Typography>
            <form onSubmit={onSubmitForm}>
                <Grid container direction="column" spacing={2} mb={3}>
                    <Grid size={12}>
                        <TextField
                            multiline
                            id="text"
                            name="text"
                            label="Comment"
                            value={state.text}
                            onChange={onInputChange}
                            placeholder="Enter your description "
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <Grid container justifyContent="flex-end">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default CommentForm;
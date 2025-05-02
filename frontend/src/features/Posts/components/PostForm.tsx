import {Button, CircularProgress, TextField} from "@mui/material";
import Grid from '@mui/material/Grid';
import {useState} from "react";
import {toast} from "react-toastify";
import SendIcon from '@mui/icons-material/Send';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCreatePostLoading} from "../postsSlice.ts";
import {IPostMutation} from "../../../types";
import {createPosts} from "../postsThunk.ts";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";

const initialState = {
    title: '',
    description: '',
    image: null,
}

const PostForm = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreatePostLoading)
    const [state, setState] = useState<IPostMutation>(initialState);
    const navigate = useNavigate();

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (state.title.trim().length === 0) {
            alert("Please enter message and description");
            return;
        } else if (state.description.trim().length === 0 || !state.image) {
            alert("Enter a description or select an image");
            return;
        }
        await dispatch(createPosts(state));
        toast.success('Post was added Successfully!');
        navigate('/')
        setState(initialState);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setState(prevState => {
                return {...prevState,
                    [name]: files[0]};
            })
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid >
                    <TextField
                        id="title"
                        label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid >
                    <TextField
                        id="description"
                        label="Description"
                        value={state.description}
                        onChange={inputChangeHandler}
                        name="description"
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <FileInput onChange={filesInputChangeHandler} name="image" label="image" file={state.image} />
                </Grid>
                <Grid>
                    <Button
                        endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                        size="small"
                        disabled={loading}
                        variant="contained"
                        type="submit"
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>

        </form>
    );
};

export default PostForm;
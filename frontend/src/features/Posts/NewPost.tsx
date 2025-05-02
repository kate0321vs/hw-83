import { useAppSelector } from "../../app/hooks.ts";
import PostForm from "./components/PostForm.tsx";
import {Container, Typography} from "@mui/material";
import {selectUser} from "../Users/usersSlice.ts";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const NewPost = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return ;
        }
    }, [user])

    return (
        <Container maxWidth="sm">
            <Typography mb={3} variant='h4' textAlign='center'>Add new post</Typography>
            <PostForm></PostForm>
        </Container>
    );
};

export default NewPost;
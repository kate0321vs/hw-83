import {createAsyncThunk} from "@reduxjs/toolkit";
import {IComment, ICommentMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const fetchComments = createAsyncThunk<IComment[], string>(
    'comments/fetchAll',
    async (id) => {
        const commentsResponse = await axiosApi<IComment[]>(`/comments?id_post=${id}`);
        const comments: IComment[] = commentsResponse.data;
        return comments;
    }
);

export const createComments = createAsyncThunk<void, ICommentMutation, { state: RootState }>(
    'comments/create',
    async (comment, ThunkApi) => {
        const usersState = ThunkApi.getState().users
        await axiosApi.post('/comments',
            comment,
            {headers: {"Authorization": usersState.user?.token}
            });
    }
);


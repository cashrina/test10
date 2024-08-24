import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comments, CommentsMutation} from "../../../../types";
import axiosApi from "../../../axiosApi";
import {RootState} from "../../../app/store";

export const fetchComments = createAsyncThunk<Comments[]>(
    'comments/fetchAll',
    async () => {
        const {data: comments} = await axiosApi.get<Comments[]>('/comments');
        return comments;
    }
);

export const createComments = createAsyncThunk<void, CommentsMutation>(
    'comments/create',
    async (commentsMutation) => {
        const formData = new FormData();
        formData.append('news_id', commentsMutation.news_id.toString());
        formData.append('author', commentsMutation.author || '');
        formData.append('description', commentsMutation.description);

        await axiosApi.post('/comments', formData);
    }
);

export const fetchOneComments = createAsyncThunk<Comments, string>(
    'comments/fetchOne',
    async (id) => {
        const {data: comments} = await axiosApi.get<Comments>(`/comments/${id}`);
        return comments;
    }
);

export const deleteOneComments = createAsyncThunk<void, string, { state: RootState }>(
    'comments/delete',
    async (commentsId) => {
        await axiosApi.delete(`/comments/${commentsId}.json`);
    },
);
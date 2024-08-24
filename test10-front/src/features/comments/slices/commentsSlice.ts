import {Comments} from "../../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createComments, deleteOneComments, fetchComments, fetchOneComments} from "./commentsThunk";

export interface CommentsState {
    items: Comments[];
    comments: Comments | null;
    itemsFetching: boolean;
    oneFetching: boolean;
    isCreating: boolean;
    onDelete: false | string;
}

const initialState: CommentsState = {
    items: [],
    comments: null,
    itemsFetching: false,
    oneFetching: false,
    isCreating: false,
    onDelete: false,
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.itemsFetching = true;
        }).addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
            state.itemsFetching = false;
            state.items = comments;
        }).addCase(fetchComments.rejected, (state) => {
            state.itemsFetching = false;
        });

        builder.addCase(createComments.pending, (state) => {
            state.isCreating = true;
        }).addCase(createComments.fulfilled, (state) => {
            state.isCreating = false;
        }).addCase(createComments.rejected, (state) => {
            state.isCreating = false;
        });

        builder.addCase(fetchOneComments.pending, (state) => {
            state.comments = null;
            state.oneFetching = true;
        }).addCase(fetchOneComments.fulfilled, (state, {payload: news}) => {
            state.comments = news;
            state.oneFetching = false;
        }).addCase(fetchOneComments.rejected, (state) => {
            state.oneFetching = false;
        });

        builder.addCase(deleteOneComments.pending, (state, { meta : {arg : commentsId}  }) => {
            state.onDelete = commentsId;
        }).addCase(deleteOneComments.fulfilled, (state) => {
            state.onDelete = false;
        }).addCase(deleteOneComments.rejected, (state) => {
            state.onDelete = false;
        });
    },

    selectors: {
        selectComments: (state) => state.items,
        selectCommentsFetching: (state) => state.itemsFetching,
        selectPostComments: (state) => state.isCreating,
        selectDeleteComments: (state) => state.onDelete,
        selectFetchOneComments: (state) => state.oneFetching,
    },
});

export const commentsReducer = commentsSlice.reducer;

export const {
    selectComments,
    selectCommentsFetching,
    selectPostComments,
    selectDeleteComments,
    selectFetchOneComments,
}= commentsSlice.selectors;
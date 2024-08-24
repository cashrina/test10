import {News} from "../../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createNews, deleteOneNew, fetchNews, fetchOneNews} from "./newsThunk";

export interface NewsState {
    items: News[];
    news: News | null;
    itemsFetching: boolean;
    oneFetching: boolean;
    isCreating: boolean;
    onDelete: false | string;
}

const initialState: NewsState = {
    items: [],
    news: null,
    itemsFetching: false,
    oneFetching: false,
    isCreating: false,
    onDelete: false,
};

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.pending, (state) => {
            state.itemsFetching = true;
        }).addCase(fetchNews.fulfilled, (state, {payload: news}) => {
            state.itemsFetching = false;
            state.items = news;
        }).addCase(fetchNews.rejected, (state) => {
            state.itemsFetching = false;
        });

        builder.addCase(createNews.pending, (state) => {
            state.isCreating = true;
        }).addCase(createNews.fulfilled, (state) => {
            state.isCreating = false;
        }).addCase(createNews.rejected, (state) => {
            state.isCreating = false;
        });

        builder.addCase(fetchOneNews.pending, (state) => {
            state.news = null;
            state.oneFetching = true;
        }).addCase(fetchOneNews.fulfilled, (state, {payload: news}) => {
            state.news = news;
            state.oneFetching = false;
        }).addCase(fetchOneNews.rejected, (state) => {
            state.oneFetching = false;
        });

        builder.addCase(deleteOneNew.pending, (state, { meta : {arg : newsId}  }) => {
            state.onDelete = newsId;
        }).addCase(deleteOneNew.fulfilled, (state) => {
            state.onDelete = false;
        }).addCase(deleteOneNew.rejected, (state) => {
            state.onDelete = false;
        });
    },

    selectors: {
        selectNews: (state) => state.items,
        selectNewsFetching: (state) => state.itemsFetching,
        selectPostNews: (state) => state.isCreating,
        selectDeleteNews: (state) => state.onDelete,
        selectFetchOneNews: (state) => state.oneFetching,
    },
});

export const newsReducer = newsSlice.reducer;

export const {
    selectNews,
    selectNewsFetching,
    selectPostNews,
    selectDeleteNews,
    selectFetchOneNews,
}= newsSlice.selectors;
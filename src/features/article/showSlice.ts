import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from '../../app/store';
import article from "./content.json";
import HOST from '../../appconf';
const apiUrl = "reacts/article/10";

type ARTICLE = typeof article;

type articleState = {
    article: ARTICLE;

    // article: string;
};

const initialState: articleState = {
    article: article
};

export const fetchAsyncGetArticles = createAsyncThunk(
    "article/getArticle",
    async () => {
        const { data } = await axios.get<string>(`${HOST}/${apiUrl}`);
        return { data: data };
    }
);

// const articleSlice = createSlice({
//     name: "article",
//     initialState: initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchAsyncGetArticles.fulfilled, (state, action) => {
//             return {
//                 ...state,
//                 article: action.payload.data
//             };
//         });
//     },
// });

export const selectArticles = (state: articleState) => state.article;

// export default articleSlice.reducer;
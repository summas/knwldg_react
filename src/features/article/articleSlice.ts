import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from '../../app/store';
import article from "./article.json";
import HOST from '../../appconf';
const apiUrl = "reacts/ajax";

type ARTICLE = typeof article;

type articleState = {
    article: ARTICLE;
    category_id: String;
    group_id: String;
};

const initialState: articleState = {
    article: article,
    category_id: "",
    group_id: "",
};

export let exportstate: articleState = {
    article: article,
    category_id: "",
    group_id: "",
};

export const fetchAsyncGetArticles = createAsyncThunk(
    "article/getArticle",
    async ({category_id, group_id} : {category_id: String, group_id: String}) => {
        exportstate.category_id = category_id;
        exportstate.group_id = group_id;
        const { data } = await axios.get<ARTICLE>(`${HOST}/${apiUrl}/${category_id}/${group_id}`);
        return { data: data, category_id: category_id , group_id: group_id };
    }
);

const articleSlice = createSlice({
    name: "article",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGetArticles.fulfilled, (state, action) => {
            return {
                ...state,
                article: action.payload.data
            };
        });
    },
});

export const selectArticles = (state: RootState) => state.article.article;

export default articleSlice.reducer;
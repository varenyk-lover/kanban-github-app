import {createSlice} from "@reduxjs/toolkit";

const repoSlice = createSlice({
    name: "repo",
    initialState: {
        url: "",
    },
    reducers: {
        setRepoUrl: (state, action) => {
            state.url = action.payload;
        },

    },
});

export const repoActions = repoSlice.actions;
export const repoReducer = repoSlice.reducer;

export default repoSlice;
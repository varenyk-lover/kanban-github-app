import {configureStore} from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import githubApi from "./githubApi";
// import {repoReducer} from "./repoSlice";
import {kanboardReducer} from "./kanboardSlice";

const store = configureStore({
    reducer: {
        boards: boardsSlice.reducer,
        [githubApi.reducerPath]: githubApi.reducer,
        // repo: repoReducer,
        kanboard: kanboardReducer,
    },
    middleware: (getDefaultMiddleware) => {
        //getDefaultMiddleware() повертає масив middleware, які додаються за замовчуванням. Потім до цього масиву завдяки concat додається middleware з githubApi.middleware
        return getDefaultMiddleware()
            .concat(githubApi.middleware)
    },

});

export default store;
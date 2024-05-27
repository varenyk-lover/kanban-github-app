import {configureStore} from "@reduxjs/toolkit";
import githubApi from "./githubApi";
import {kanboardReducer} from "./kanboardSlice";

const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        kanboard: kanboardReducer,
    },
    middleware: (getDefaultMiddleware) => {
        //цей getDefaultMiddleware() повертає масив middleware, які додаються за замовчуванням. Потім до цього масиву завдяки concat додається middleware з githubApi.middleware
        return getDefaultMiddleware()
            .concat(githubApi.middleware)
    },

});

export default store;
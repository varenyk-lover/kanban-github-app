import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import {BASE_URL} from "../utils/constants";
import {Repo} from "../types/Repo";
import {BaseQueryResponse} from "../types/Query";

const githubApi = createApi({
    reducerPath: "githubApi",
    baseQuery: fetchBaseQuery({
        baseUrl:  "https://api.github.com/repos/",
    }),


    endpoints: (builder) => ({
        getRepoInfo: builder.query<Repo, BaseQueryResponse>({

            query: (url) => {
                const pathname = new URL(url).pathname;
                sessionStorage.setItem("URL", url);
                return pathname;
            },
        }),
    }),


});
export default githubApi;
export const {useGetRepoInfoQuery} = githubApi;

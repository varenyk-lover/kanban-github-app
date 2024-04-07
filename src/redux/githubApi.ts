import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {BASE_URL} from "../utils/constants";
import {Repo} from "../types/Repo";

const githubApi = createApi({
    reducerPath: "githubApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getRepoInfo: builder.query<Repo, string>({
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

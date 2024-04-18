import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, COLUMNS} from "../utils/constants";
import {Repo} from "../types/Repo";
import {Issue} from "../types/Issue";
import {Query} from "../types/Query";
import {convertTasksIntoIssues} from "../utils/convertTasksIntoIssues";

const githubApi = createApi({
    reducerPath: "githubApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    } as any),
    endpoints: (builder) => {
        return {
            getRepoInfo: builder.query<Repo, string>({
                query: (url: Query['url']) => {
                    const pathname = new URL(url).pathname;
                    sessionStorage.setItem("URL", url);
                    return pathname;
                },
            } as any),
            getAllNewIssues: builder.query<Issue[], Query>({
                query: (url: Query['url']) => {
                    const pathname = new URL(url).pathname;
                    console.log(`pathname open: ${pathname}`)
                    return `${pathname}/issues?state=open`;
                },
                transformResponse: (response: Issue[]) => {
                    return convertTasksIntoIssues(response, COLUMNS.TODO);
                },
            } as any),
            getAssignedIssues: builder.query<Issue[], Query>({
                query: (url: Query['url']) => {
                    const pathname = new URL(url).pathname;
                    return `${pathname}/issues?state=open&assignee=*`;
                },
                transformResponse: (response: Issue[]) => {
                    return convertTasksIntoIssues(response, COLUMNS.IN_PROGRESS);
                },
            } as any),
            getClosedIssues: builder.query<Issue[], Query>({
                query: (url: Query['url']) => {
                    const pathname = new URL(url).pathname;
                    return `${pathname}/issues?state=closed`;
                },
                transformResponse: (response: Issue[]) => {
                    return convertTasksIntoIssues(response, COLUMNS.DONE);
                },
            } as any),
        };
    },
});

export default githubApi;
export const {useGetRepoInfoQuery, useGetAllNewIssuesQuery, useGetAssignedIssuesQuery, useGetClosedIssuesQuery} = githubApi;


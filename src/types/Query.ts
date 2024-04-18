import {TaskGit} from "./TaskGit";



export interface QueryResponse {
    data: TaskGit[];
    isFetching?: boolean;
    isLoading?: boolean;
    isError?: boolean;
}

export interface Query {
    url: string;
}

export type QueryFnType = (value: Query) => QueryResponse;

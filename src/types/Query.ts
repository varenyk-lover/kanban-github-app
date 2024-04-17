import {Repo} from "./Repo";
import {Task} from "./Task";



export interface QueryResponse {
    data: Task[];
    isFetching?: boolean;
    isLoading?: boolean;
    isError?: boolean;
}

export interface Query {
    url: string;
}

export type QueryFnType = (value: Query) => QueryResponse;

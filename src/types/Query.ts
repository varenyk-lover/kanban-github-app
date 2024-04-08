import {Repo} from "./Repo";

export interface BaseQueryResponse {
    data: Repo;
    isFetching?: boolean;
    isLoading?: boolean;
    isError?: boolean;
}

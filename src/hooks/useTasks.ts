import {useGetAssignedIssuesQuery, useGetClosedIssuesQuery, useGetAllNewIssuesQuery} from "../redux/githubApi";
import {Query} from "../types/Query";

export const useTasks = (url: Query['url']) => {

    const allNewIssuesQuery = useGetAllNewIssuesQuery(url);
    const assignedIssuesQuery = useGetAssignedIssuesQuery(url);
    const closedIssuesQuery = useGetClosedIssuesQuery(url);

    const columns = [allNewIssuesQuery, assignedIssuesQuery, closedIssuesQuery];

    return {
        tasks: columns.map((column) => column.data),
    };
};
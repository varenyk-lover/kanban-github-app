import {useGetAssignedIssuesQuery, useGetClosedIssuesQuery, useGetAllNewIssuesQuery} from "../redux/githubApi";
import {Query} from "../types/Query";

export const useTasks = (url: Query['url']) => {

    const allNewIssuesQuery = useGetAllNewIssuesQuery(url);
    const assignedIssuesQuery = useGetAssignedIssuesQuery(url);
    const closedIssuesQuery = useGetClosedIssuesQuery(url);

    const columns = [allNewIssuesQuery, assignedIssuesQuery, closedIssuesQuery];

    return {
        tasks: columns.map((column) => column.data)
    };

};

/*

import { useEffect } from "react";
import { useGetAllNewIssuesQuery, useGetAssignedIssuesQuery, useGetClosedIssuesQuery } from "../redux/githubApi";
import { Query } from "../types/Query";
import { kanboardActions } from "../redux/kanboardSlice";
import {useTDispatch} from "./reduxHooks";

export const useTasks = (url: Query['url']) => {
    const dispatch = useTDispatch();

    const allNewIssuesQuery = useGetAllNewIssuesQuery(url);
    const assignedIssuesQuery = useGetAssignedIssuesQuery(url);
    const closedIssuesQuery = useGetClosedIssuesQuery(url);
//Запити лише один раз, коли компонент, який використовує цей хук, буде відмонтований.
    useEffect(() => {
        dispatch(kanboardActions.setTasks([allNewIssuesQuery.data, assignedIssuesQuery.data, closedIssuesQuery.data]));
        // Cleanup function коли буде анмаунт
        return () => {
            dispatch(kanboardActions.setTasks([]));
        };
    }, [allNewIssuesQuery.data, assignedIssuesQuery.data, closedIssuesQuery.data, dispatch]);

    return {
        tasks: [allNewIssuesQuery.data, assignedIssuesQuery.data, closedIssuesQuery.data],
    };
};
*/

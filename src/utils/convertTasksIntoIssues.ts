import {Issue} from "../types/Issue";
import {ColumnType} from "./constants";
import {Task} from "../types/Task";


export const convertTasksIntoIssues = (issues: Issue[], column: ColumnType): Task[] => {
    return  issues.map((item) => ({
        ...item,
        column
    }));
};
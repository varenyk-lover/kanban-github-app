import {Issue} from "../types/Issue";
import {ColumnType} from "./constants";
import {TaskGit} from "../types/TaskGit";


export const convertTasksIntoIssues = (issues: Issue[], column: ColumnType): TaskGit[] => {
    return  issues.map((item) => ({
        ...item,
        column
    }));
};
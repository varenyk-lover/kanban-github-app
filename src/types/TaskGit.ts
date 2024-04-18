import {COLUMNS, ColumnType} from "../utils/constants";
import {Issue} from "./Issue"

export interface TaskGit extends Issue {
    column: ColumnType;
}

interface TaskMap {
    [COLUMNS.TODO]: TaskGit[];
    [COLUMNS.IN_PROGRESS]: TaskGit[];
    [COLUMNS.DONE]: TaskGit[];
}

export type SetItemsPropType = TaskMap | ((items: TaskMap) => TaskMap);
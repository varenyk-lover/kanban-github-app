import {COLUMNS, ColumnType} from "../utils/constants";
import {Issue} from "./Issue";

export interface Task extends Issue {
    column: ColumnType;
}

interface TaskMap {
    [COLUMNS.TODO]: Task[];
    [COLUMNS.IN_PROGRESS]: Task[];
    [COLUMNS.DONE]: Task[];
}

export type SetItemsPropType = TaskMap | ((items: TaskMap) => TaskMap);
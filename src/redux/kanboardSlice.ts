import {TaskGit} from "../types/TaskGit";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ApiData = TaskGit[];

interface RepoState {
    url: string;
    tasks: ApiData;
}
//FIX PAYLOAD
interface DragTaskInColumnPayload {
    colIndex: number;
    prevColIndex: number;
    taskIndex: number;
    newPosition: number;
}

interface DragTaskPayload {
    colIndex: number;
    prevColIndex: number;
    taskIndex: number;
}

const initialState: RepoState = {
    url: "",
    tasks: [],
};

const kanboardSlice = createSlice({
    name: "kanboard",
    initialState,
    reducers: {
        setRepoUrl: (state, action: PayloadAction<string>) => {
            state.url = action.payload;
        },
        setTasks: (state, action: PayloadAction<ApiData>) => {
            state.tasks = action.payload;
        },
        //Переміщення ВСЕРЕДИНІ однієї колонки
        dragTaskInColumn: (state, action: PayloadAction<{ colIndex: number; taskIndex: number; newPosition: number }>) => {
            const { colIndex, taskIndex, newPosition } = action.payload;
            const column = state.tasks[colIndex];
            const task = column.tasks.splice(taskIndex, 1)[0]; // Видаляємо завдання з поточної позиції з поточної колонки
            column.tasks.splice(newPosition, 0, task); // Вставляємо завдання на нову позицію в тій самій колонці
        },
        //Переміщення МІЖ колонками
        dragTask: (state, action: PayloadAction<{ colIndex: number; prevColIndex: number; taskIndex: number; newPosition: number }>) => {
            const { colIndex, prevColIndex, taskIndex, newPosition } = action.payload;
            const column = state.tasks[colIndex];
            const prevColumn = state.tasks[prevColIndex];
            const task = prevColumn.tasks.splice(taskIndex, 1)[0]; // Видаляємо завдання з попередньої колонки
            column.tasks.splice(newPosition, 0, task); // Вставляємо завдання  з попередньої колонки на нову позицію в новій колонці
        },

    }
});

export const kanboardActions = kanboardSlice.actions;
export const kanboardReducer = kanboardSlice.reducer;
export default  kanboardSlice;
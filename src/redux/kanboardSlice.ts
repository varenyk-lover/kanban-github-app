import {TaskGit} from "../types/TaskGit";
import {  createSlice, PayloadAction} from "@reduxjs/toolkit";

type ApiData = TaskGit[];

interface RepoState {
    url: string;
    alltasks: ApiData;
}



interface DragTaskInColumnPayload {
    colIndex: number;
    taskIndex: number;
    newPosition: number;
}

interface DragTaskPayload {
    colIndex: number;
    prevColIndex: number;
    taskIndex: number;
    newPosition: number;
}

const initialState: RepoState = {
    url: "",
    alltasks: [],
};

const kanboardSlice = createSlice({
    name: "kanboard",
    initialState,
    reducers: {
        setRepoUrl: (state, action: PayloadAction<string>) => {
            state.url = action.payload;
            console.log(`url from slice ${state.url}`)
        },
        setTasks: (state, action: PayloadAction<ApiData>) => {
            state.alltasks = action.payload;
        },
        //Переміщення ВСЕРЕДИНІ однієї колонки
        dragTaskInColumn: (state, action: PayloadAction<DragTaskInColumnPayload>) => {
            const {colIndex, taskIndex, newPosition} = action.payload;
            const column = state.alltasks[colIndex];
            const task = column.alltasks.splice(taskIndex, 1)[0]; // Видаляємо завдання з поточної позиції з поточної колонки
            column.alltasks.splice(newPosition, 0, task); // Вставляємо завдання на нову позицію в тій самій колонці
        },
        //Переміщення МІЖ колонками
        dragTask: (state, action: PayloadAction<DragTaskPayload>) => {
            const {colIndex, prevColIndex, taskIndex, newPosition} = action.payload;
            const column = state.alltasks[colIndex];
            const prevColumn = state.alltasks[prevColIndex];
            const task = prevColumn.alltasks.splice(taskIndex, 1)[0]; // Видаляємо завдання з попередньої колонки
            column.alltasks.splice(newPosition, 0, task); // Вставляємо завдання  з попередньої колонки на нову позицію в новій колонці
        },
    }
});

export const kanboardActions = kanboardSlice.actions;
export const kanboardReducer = kanboardSlice.reducer;
export default kanboardSlice;
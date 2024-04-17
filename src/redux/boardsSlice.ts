import {createSlice} from "@reduxjs/toolkit";
import data from "../data/data.json";

const boardsSlice = createSlice({
    name: "boards",
    initialState: data.boards,
    reducers: {

        setBoardActive: (state, action) => {
            state.map((board, index) => {
                index === action.payload.index
                    ? (board.isActive = true)
                    : (board.isActive = false);
                return board;
            });
        },

        //FOR DRAGGING BETWEEN DIFFERENT COLUMN
        dragTask: (state, action) => {
            const {colIndex, prevColIndex, taskIndex, newPosition} = action.payload;
            const board = state.find((board) => board.isActive);
            const prevCol = board.columns.find((col, i) => i === prevColIndex);
            const task = prevCol.tasks.splice(taskIndex, 1)[0];
            /*Цей рядок коду виконує наступні дії:
            1)prevCol.tasks - це масив колонки, який містить завдання.
            2).splice(draggedTaskIndex, 1) - метод splice видаляє елементи з масиву. В даному випадку, він видаляє один
             елемент з масиву prevCol.tasks, починаючи з індексу draggable taskIndex. Однак метод splice повертає масив
              видалених елементів, тому ми видаляємо тільки один елемент, а не масив.
            3)[0] - після виконання методу splice, ми отримуємо масив з видаленими елементами (в даному випадку, масив
            з одним елементом). Зараз ми вибираємо перший (і єдиний) елемент з цього масиву, і це значення присвоюється
             змінній draggable task.
            Тобто, цей рядок коду видаляє 1(це другий аргумент ф-ї) елемент з масиву prevCol.tasks за індексом draggable taskIndex і повертає
             його значення, яке потім зберігається у змінній draggable task. Це корисно, коли ви хочете зберегти видалений
              елемент для подальшого використання, наприклад, для переміщення його на іншу позицію, як у випадку з
              реалізацією методу drag and drop.*/


            //Додає в потрібне місце
            const newCol = board.columns.find((col, i) => i === colIndex);
            // Видаляє 0 елементів по індексу newPosition і вставляє task:
            newCol.tasks.splice(newPosition, 0, task);//Тобто: Додає переміщене завдання в нову колонку на потрібне місце:
        },
        //FOR DRAGGING IN ONE COLUMN
        dragTaskInColumn: (state, action) => {
            const { colIndex, prevColIndex, taskIndex, newPosition } = action.payload;
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((col, i) => i === colIndex);
            const task = column.tasks[taskIndex];

            // Перевіряє чи завдання в тому ж стовпці і бере завдання
            const prevColumn = board.columns.find((col, i) => i === prevColIndex);
            prevColumn.tasks.splice(taskIndex, 1);

            // Видаляє 0 елементів по індексу newPosition і вставляє task
            // Тобто: Додає завдання в новий стовпець на вказану позицію
            column.tasks.splice(newPosition, 0, task);
        },



    },
});

export default boardsSlice;

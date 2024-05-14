import Column from "./Column";
import * as React from "react";
import {useSelector} from "react-redux";
import {Query} from "../../types/Query";
import {COLUMNS, ColumnType} from "../../utils/constants";
import {useTasks} from "../../hooks/useTasks";
import {useTDispatch, useTSelector} from "../../hooks/reduxHooks";
import {kanboardActions} from "../../redux/kanboardSlice";
import {useEffect} from "react";

interface BoardProps extends Query {
    isLoading: boolean;
    isFetching: boolean;
}

const Board: React.FC<BoardProps> = ({url, isFetching, isLoading}) => {
 /*   const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;*/

    // const tasks = useTSelector((state) => state.kanboard.tasks);

    // Використовуємо хук useTasks для отримання даних
    const {tasks} = useTasks(url);
    const dispatch = useTDispatch();

    const columnTitles = Object.values(COLUMNS as ColumnType);

    // Викликаємо dispatch тут, використовуючи дані з хука
    useEffect(() => {
        //  виконати при монтуванні
         dispatch(kanboardActions.setTasks(tasks));
console.log('Mount Board')
        console.log(tasks);

        // Cleanup function коли буде анмаунт
        return () => {
            dispatch(kanboardActions.setTasks([]));
            console.log('Unmount Board')

        };
    }, [dispatch, tasks]);

    return (
        <div className="flex mx-auto justify-center gap-6">
            {columnTitles.map((title, index) => (
                <Column key={index} colIndex={index} title={title} column={tasks[index]} isFetching={isFetching} isLoading={isLoading} />
            ))}
        </div>
    );
};

export default Board;
import Column from "./Column";
import * as React from "react";
import {useSelector} from "react-redux";
import {Query} from "../../types/Query";
import {COLUMNS, ColumnType} from "../../utils/constants";
import {useTasks} from "../../hooks/useTasks";

interface BoardProps extends Query {
}

const Board: React.FC<BoardProps> = ({url}) => {
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;

    const {tasks} = useTasks(url);

    return (
        /*    <div className="flex  justify-center gap-6 ">
                {columns.map((col, index) => (
                    <Column key={index} colIndex={index}/>
                ))}
            </div>*/

        <div className="flex  justify-center gap-6 ">
            {Object.keys(COLUMNS).map((colKey, index) => (
                <Column key={colKey} title={COLUMNS[colKey as ColumnType]} taskIndex={tasks[index]}/>
            ))}
        </div>
    );
};

export default Board;
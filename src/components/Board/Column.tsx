import {useDispatch, useSelector} from "react-redux";
import Task from "./Task";
import boardsSlice from "../../redux/boardsSlice";
import * as React from "react";
import {  ColumnType} from "../../utils/constants";
import {TaskGit} from "../../types/TaskGit";
import {useTDispatch} from "../../hooks/reduxHooks";
import {kanboardActions} from "../../redux/kanboardSlice";

interface ColumnProps {
    colIndex: number;
    title: ColumnType;
    column: TaskGit[];
}

const Column: React.FC<ColumnProps> = ({  colIndex,
                                           title,
                                           column}) => {
    const dispatch = useTDispatch();
/*
    const boards = useSelector(state => state.boards);
    const board = boards.find(board => board.isActive);
    const col = board.columns.find((col, i) => i === colIndex);

*/

    console.log(title);
    //FOR DRAGGING AND BETWEEN DIFFERENT COLUMNS
    const handleOnDrop = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text"));

        if (colIndex !== data.prevColIndex) {
            // BETWEEN DIFFERENT COLUMNS
            dispatch(
                kanboardActions.dragTask({
                    colIndex,
                    prevColIndex: data.prevColIndex,
                    taskIndex: data.taskIndex,
                })
            );
        }


    };

    const handleOnDragOver = (e) => {
        e.preventDefault();
    };


    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
            className=" mx-5 pt-[90px]  "
        >
            <div
                className="  p-5 border-[1px]   overflow-y-auto scrollbar-hide border-indigo-500 rounded-xl min-w-[320px] h-[620px] ">
                <p className=" font-semibold flex justify-center  items-center  gap-2 tracking-widest md:tracking-[.2em] text-gray-500  ">

                    {title}
                </p>

                {column.map((task, index) => (
                    <Task key={index} taskIndex={index} colIndex={colIndex}/>
                ))}
            </div>

        </div>
    );
}

export default Column;
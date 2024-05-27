import {useDispatch, useSelector} from "react-redux";
import Task from "./Task";
import boardsSlice from "../../redux/boardsSlice";
import * as React from "react";
import {ColumnType} from "../../utils/constants";
import {TaskGit} from "../../types/TaskGit";
import {useTDispatch} from "../../hooks/reduxHooks";
import {kanboardActions} from "../../redux/kanboardSlice";
import StateHandler from "../StateHandler/StateHandler";
import loader from "../../assets/loading-spinner.svg";
import nodata from "../../assets/box.svg";
import notfound from "../../assets/github-opened.svg";
import Board from "./Board";

interface ColumnProps {
    colIndex: number;
    title: ColumnType;
    column: TaskGit[];

}

const Column: React.FC<ColumnProps> = ({
                                           colIndex,
                                           title,
                                           column,
                                       }) => {
    const dispatch = useTDispatch();


    /*
        const boards = useSelector(state => state.boards);
        const board = boards.find(board => board.isActive);
        const col = board.columns.find((col, i) => i === colIndex);

    */


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
            className="mx-5 "
        >
            <div className=" w-[270px] sm:w-auto  border-[1px]  border-indigo-500 rounded-xl ">
                <div
                    className=" m-0 sm:m-3 px-2 sm:px-5  overflow-x-hidden overflow-y-auto scrollbar-hide w-auto sm:w-[320px] h-[670px] ">
                    <p className=" pt-4 font-semibold flex justify-center  items-center  gap-2 tracking-widest md:tracking-[.2em] text-gray-500  ">

                        {title}
                    </p>
                    {(!column) ? (
                        <StateHandler imgSrc={loader} message={"Loading tasks..."} imgStyles={" animate-spin"}/>
                    )   :
                        ( column?.length > 0 ) ?   column?.map((task, index) => (
                            <Task key={index} taskIndex={index} colIndex={colIndex}
                                  title={task.title}
                                  url={task.html_url}
                                  number={task.number}
                                  createdAt={task.created_at}
                                  assignee={task.assignee?.login}
                                  comments={task.comments}/>
                        ))  : (<StateHandler imgSrc={nodata} message={"No tasks yet"}/>)

                    }
                </div>
            </div>

        </div>
    );
}

export default Column;
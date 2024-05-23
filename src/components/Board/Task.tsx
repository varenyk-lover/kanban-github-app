import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import boardsSlice from "../../redux/boardsSlice";
import * as React from "react";
import {Issue} from "../../types/Issue";
import {getTaskDate} from "../../utils/getTaskDate";


interface TaskProps {
    colIndex: number;
    taskIndex: number;
    title: Issue['title'];
    url: Issue['html_url'];
    number: Issue['number'];
    createdAt: Issue['created_at'];
    assignee: Issue['assignee'];
    comments: Issue['comments'];
}

const Task: React.FC<TaskProps> = ({
                                       taskIndex,
                                       colIndex,
                                       title,
                                       url,
                                       number,
                                       createdAt,
                                       assignee,
                                       comments,
                                   }) => {

    const openingTime = getTaskDate(new Date(), createdAt);

    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);


    //FOR DRAGGING IN ONE COLUMN
    const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);

    //For start index on drag
    const handleOnDragStart = (e) => {
        setDraggedTaskIndex(taskIndex);
        e.dataTransfer.setData(
            "text",
            JSON.stringify({taskIndex, prevColIndex: colIndex})
        );
    };

    const handleOnDragOver = (e) => {
        e.preventDefault();
    };

    //After drag, when we release the mouse cursor and drop task card
    const handleOnDrop = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text'));

        if (data.prevColIndex === colIndex && data.taskIndex !== taskIndex) {
            //Calculate the position on which we will put task while drop it
            const position = taskIndex > data.taskIndex ? taskIndex : taskIndex + 1;

            // Operation of dropping task the same one column
            dispatch(
                boardsSlice.actions.dragTaskInColumn({
                    colIndex,
                    prevColIndex: data.prevColIndex,
                    taskIndex: data.taskIndex,
                    newPosition: position,
                })
            );
        }

    };


    return (
        <a href={url} target="_blank">
            <div
                draggable
                onDragStart={handleOnDragStart}
                onDragOver={handleOnDragOver}
                onDrop={handleOnDrop}
                className=" w-[250px] sm:w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
            >
                <p className=" font-bold tracking-wide text-sm sm:text-base text">{title}</p>
                <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
                    #{number} opened {openingTime}
                </p>

                <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-400">
                    {assignee ? `${assignee} | ` : ""} Comments: {comments}
                </p>
            </div>

        </a>
    );
}

export default Task;
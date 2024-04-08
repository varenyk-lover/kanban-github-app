import   {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Column from "./Board/Column";


const Home = () => {


    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;



    return (
        <div className="flex  justify-center gap-6 ">
            {/* Columns Section */}

            {columns.length > 0 ? (
                <>
                    {columns.map((col, index) => (
                        <Column key={index} colIndex={index} />
                    ))}

                </>
            ) : (
                <>
                    <h1>Enter repo URL to see list of issues</h1>
                </>
            )}

        </div>
    );
}

export default Home;
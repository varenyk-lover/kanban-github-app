import   {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Column from "./Board/Column";


const Home = () => {
/*    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });*/


    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;



    return (
        <main
            className="bg-[#f4f7fd] pt-[90px] h-screen scrollbar-hide  flex  justify-center  dark:bg-[#20212c]   overflow-y-hidden gap-6 "

        >


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

        </main>
    );
}

export default Home;
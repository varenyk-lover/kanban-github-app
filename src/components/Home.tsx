import {useSelector} from "react-redux";
import Column from "./Board/Column";
import loader from "../assets/loading-spinner.svg";
import nodata from "../assets/box.svg";
import notfound from "../assets/github-opened.svg";
import * as React from "react";
import {BaseQueryResponse} from "../types/Query";
import StateHandler from "./StateHandler/StateHandler";

interface HomeProps extends BaseQueryResponse {
    url: string
}

const Home: React.FC<HomeProps> = ({data, url}) => {
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;

    const {
        data: repoInfo,
        isLoading,
        isFetching,
        isError,
    } = data;

    return (
        <main
            className="bg-[#f4f7fd] pt-[90px] h-screen scrollbar-hide   dark:bg-[#20212c]   overflow-y-hidden  flex align-center  justify-center">
            {(isFetching || isLoading) ? (
                <StateHandler imgSrc={loader} message={"Loading..."} imgStyles={" animate-spin"}/>
            ) : isError ? (
                    <StateHandler imgSrc={notfound}
                                  message={`Github account or repository not found. Please refresh the page or try another URL.`}/>
                ) :
                (repoInfo !== undefined && columns.length > 0) ? (
                    <div className="flex  justify-center gap-6 ">
                        {columns.map((col, index) => (
                            <Column key={index} colIndex={index}/>
                        ))}
                    </div>
                ) : (<StateHandler imgSrc={nodata} message={"No data"}/>)
            }
        </main>
    );
}

export default Home;
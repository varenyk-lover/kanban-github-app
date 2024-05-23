import {useSelector} from "react-redux";
import Column from "./Board/Column";
import loader from "../assets/loading-spinner.svg";
import nodata from "../assets/box.svg";
import notfound from "../assets/github-opened.svg";
import * as React from "react";
import { Query} from "../types/Query";
import StateHandler from "./StateHandler/StateHandler";
import Board from "./Board/Board";
import {Repo} from "../types/Repo";

interface HomeProps {
    repoInfo?: Repo;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    url: Query['url'];
}

const Home: React.FC<HomeProps> = ({
                                       repoInfo,
                                       isLoading,
                                       isFetching,
                                       isError, url
                                   }) => {
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;

    console.log(repoInfo);

    return (
        <main
            className="bg-[#f4f7fd] pt-[280px] sm:pt-[350px] sm:pt-[290px] md:pt-[190px] h-screen scrollbar-hide dark:bg-[#20212c]   overflow-y-hidden overflow-x-auto flex align-center  ">
            {(isFetching || isLoading) ? (
                <StateHandler imgSrc={loader} message={"Loading..."} imgStyles={" animate-spin"}/>
            ) : isError ? (
                    <StateHandler imgSrc={notfound}
                                  message={`Github account or repository not found. Please refresh the page or try another URL.`}/>
                ) :
                (!isError && repoInfo ) ? (
                    <Board url={url} isFetching={isFetching} isLoading={isLoading}/>
                ) : (<StateHandler imgSrc={nodata} message={"No data"}/>)
            }
        </main>
    );
}

export default Home;
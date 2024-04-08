import * as React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import {useTSelector} from "./hooks/reduxHooks";
import {useGetRepoInfoQuery} from "./redux/githubApi";
import box from "./assets/box.svg";
import spinner from "./assets/loading-spinner.svg";


const App = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoard = boards.find((board) => board.isActive);
    if (!activeBoard && boards.length > 0)
        dispatch(boardsSlice.actions.setBoardActive({index: 0}));

    const url = useTSelector((state) => state.repo.url);
    const cachedURL = sessionStorage.getItem("URL") || "";


    //skip: якщо url та cachedURL пусті, ми пропускаємо запит, оскільки немає потреби виконувати запит, якщо URL не встановлено або невизначено.
    /*   const {
           data,
           isLoading,
           isFetching,
           isError,
       } = useGetRepoInfoQuery(url || cachedURL, {
           skip: !url && !cachedURL,
       });*/
    const data = useGetRepoInfoQuery(url || cachedURL, {
        skip: !url && !cachedURL,
    });
    const {
        data: repoInfo,
        isLoading,
        isFetching,
        isError,
    } = data;

    console.log(cachedURL);

    if (data) {
        console.log(repoInfo);
    }
    return (
        <div>
            <>
                <Header data={data}
                />

                <main
                    className="bg-[#f4f7fd] pt-[90px] h-screen scrollbar-hide   dark:bg-[#20212c]   overflow-y-hidden  flex align-center  justify-center">


                    {(isFetching || isLoading) ? (
                        <div className="    pt-[190px]  flex align-center  justify-start  flex-col">
                            <div
                                className=" animate-spin h-[190px]  w-[190px]  mr-3       animate-spin ">
                                 <img src={spinner}/>
                            </div>

                            <p className=" dark:text-white font-bold text-xl tracking-tighter mt-2 text-gray-500 text-center ">Loading... </p>

                        </div>
                    ) : isError ? (
                            <div>Github account or repository not found. Please refresh or try another URL.</div>
                        ) :
                        repoInfo !== undefined ? (
                            <Home url={url || cachedURL}/>
                        ) : (<div className="    pt-[190px]  flex align-center  justify-start  flex-col">

                                <div
                                >
                                    <img src={box} className=" h-[190px]   w-[190px]  flex   justify-center "/>

                                    <p className=" dark:text-white font-bold text-xl tracking-tighter mt-2 text-gray-500 text-center ">No
                                        data </p>
                                </div>


                            </div>

                        )
                    }

                    {/*
                    {(isFetching || isLoading) && (
                        <div>Downloading...</div>
                    )}

                    {isError && (
                        <div>Github account or repository not found. Please refresh or try another URL.</div>
                    )}*/}


                </main>


            </>
        </div>
    );
}

export default App;
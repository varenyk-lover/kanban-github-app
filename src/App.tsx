import * as React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import {useTSelector} from "./hooks/reduxHooks";
import {useGetRepoInfoQuery} from "./redux/githubApi";


const App = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoard = boards.find((board) => board.isActive);
    if (!activeBoard && boards.length > 0)
        dispatch(boardsSlice.actions.setBoardActive({index: 0}));

    const url = useTSelector((state) => state.repo.url);
    const cachedURL = sessionStorage.getItem("URL") || "";


    //skip: якщо url та cachedURL пусті, ми пропускаємо запит, оскільки немає потреби виконувати запит, якщо URL не встановлено або невизначено.
    const data = useGetRepoInfoQuery(url || cachedURL, {
        skip: !url && !cachedURL,
    });

    console.log(cachedURL);


    return (
        <>
            <Header data={data}/>
            <Home url={url || cachedURL} data={data}/>
        </>
    );
}

export default App;
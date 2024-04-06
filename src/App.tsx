import Home from "./components/Home";
import Header from "./components/Header";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import boardsSlice from "./redux/boardsSlice";


const App = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoard = boards.find((board) => board.isActive);
    if (!activeBoard && boards.length > 0)
        dispatch(boardsSlice.actions.setBoardActive({index: 0}));

    return (
        <div  >
            <>
                {boards.length > 0 ?
                    <>
                        <Header/>
                        <Home/>
                    </>
                    :
                    <>
                        <div>Downloading...</div>
                    </>
                }

            </>
        </div>
    );
}

export default App;
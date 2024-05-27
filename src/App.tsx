import Home from "./components/Home";
import Header from "./components/Header";
import {useTDispatch, useTSelector} from "./hooks/reduxHooks";
import {useGetRepoInfoQuery} from "./redux/githubApi";
import {useTasks} from "./hooks/useTasks";
import {useEffect} from "react";
import {kanboardActions} from "./redux/kanboardSlice";


const App = () => {
  /*  const boards = useSelector((state) => state.boards);
    const activeBoard = boards.find((board) => board.isActive);
    if (!activeBoard && boards.length > 0)
        dispatch(boardsSlice.actions.setBoardActive({index: 0}));
*/
    const dispatch = useTDispatch();
    const url = useTSelector((state) => state.kanboard.url);
    const cachedURL = sessionStorage.getItem("URL") || "";


    //skip: якщо url та cachedURL пусті, ми пропускаємо запит, оскільки немає потреби виконувати запит, якщо URL не встановлено або невизначено.
    const {
        data: repoInfo,
        isLoading,
        isFetching,
        isError,
    } = useGetRepoInfoQuery(url || cachedURL, {
        skip: !url && !cachedURL,
    });

    console.log(cachedURL);

    const { tasks } = useTasks(url || cachedURL);

    console.log(tasks);

    useEffect(() => {
        if (tasks.length > 0) {
            dispatch(kanboardActions.setTasks(tasks));
        }
    }, [tasks]);

    /*   // Викликаємо dispatch тут, використовуючи дані з хука
   useEffect(() => {
       //  виконати при монтуванні
        dispatch(kanboardActions.setTasks(tasks));
console.log('Mount Board')
       console.log(tasks);

       // Cleanup function коли буде анмаунт
       return () => {
           dispatch(kanboardActions.setTasks([]));
           console.log('Unmount Board')

       };
   }, [dispatch, tasks]);*/

    return (
        <>
            <Header repoInfo={repoInfo} isError={isError}/>
            <Home repoInfo={repoInfo}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  isError={isError} url={url || cachedURL}/>
        </>
    );
}

export default App;
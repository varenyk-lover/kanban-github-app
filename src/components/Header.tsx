import {useSelector} from "react-redux";
import {useState} from "react";
import RepoInfo from "./RepoInfo/RepoInfo";
import Form from "./Form/Form";
import * as React from "react";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import {useTSelector} from "../hooks/reduxHooks";
import {  useGetRepoInfoQuery} from "../redux/githubApi";



const Header = () => {
    //    for test
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);
//    for test
    const [data, setData] = useState();


    const url = useTSelector((state) => state.repo.url);
    const cachedURL = sessionStorage.getItem("URL") || "";
/*

    const {
        data: repoInfo,
        isLoading,
        isFetching,
        isError,
    } = useGetRepoInfoQuery(url || cachedURL, {
        skip: !url && !cachedURL,
    });
*/

    /*   if (isLoading || isFetching) {
           return <Loader />;
       }
   */

    //    for test
    const handleLoading = (e) => {
        e.preventDefault();
        const getData = async () => {
            const url = "https://api.github.com/repos/facebook/react"; // Приклад URL адреси репозиторію GitHub
            try {
                const res = await fetch(url);
                const repo = await res.json();
                // const titles = issues.map(issue => issue.title);
                // console.log(titles);
                console.log(repo.pathname);
                console.log(repo);
                console.log('Click load btn');
                setData(repo);
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }
        };

        getData();

    };

    return (
        <header className=" px-20 py-5 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
            <div className="h-[100px]">
                <div className=" flex justify-between   ">

                    {/* Left Side  */}
                    <Form handleLoading={handleLoading}/>

                    {/* Right Side */}
                    <ThemeSwitcher/>

                </div>

                {/* for test - check is any board uploaded */}
                {data &&
                <RepoInfo repoOwnerUrl={data.owner.html_url} repoNameUrl={data.html_url} repoOwner={data.owner.login}
                          repoName={data.name} stars={
                    data.stargazers_count}/>}

            </div>

        </header>
    );
}

export default Header;
import {useSelector} from "react-redux";
import {useState} from "react";
import RepoInfo from "./RepoInfo/RepoInfo";
import Form from "./Form/Form";
import * as React from "react";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import {useTSelector} from "../hooks/reduxHooks";
import {useGetRepoInfoQuery} from "../redux/githubApi";
import {BaseQueryResponse} from "../types/Query";

interface HeaderProps extends BaseQueryResponse {
}


const Header: React.FC<HeaderProps> = ({data}) => {
    //    for test
    const boards = useTSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);

    const {
        data: repoInfo,
        isLoading,
        isFetching,
        isError,
    } = data;

    return (
        <header className=" px-20 py-5 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
            <div className="h-[100px]">
                <div className=" flex justify-between   ">

                    {/* Left Side  */}
                    <Form/>

                    {/* Right Side */}
                    <ThemeSwitcher/>

                </div>

                {!isError && repoInfo ? (
                        <RepoInfo repoOwnerUrl={repoInfo.owner.html_url} repoNameUrl={repoInfo.html_url}
                                  repoOwner={repoInfo.owner.login}
                                  repoName={repoInfo.name} stars={
                            repoInfo.stargazers_count}/>)
                    : null
                }

            </div>

        </header>
    );
}

export default Header;
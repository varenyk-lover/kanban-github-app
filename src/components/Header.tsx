import RepoInfo from "./RepoInfo/RepoInfo";
import Form from "./Form/Form";
import * as React from "react";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import {useTSelector} from "../hooks/reduxHooks";
import {BaseQueryResponse} from "../types/Query";

interface HeaderProps extends BaseQueryResponse {
}


const Header: React.FC<HeaderProps> = ({data}) => {

    const {
        data: repoInfo,
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

                {(!isError && repoInfo) && (
                        <RepoInfo repoOwnerUrl={repoInfo.owner.html_url} repoNameUrl={repoInfo.html_url}
                                  repoOwner={repoInfo.owner.login}
                                  repoName={repoInfo.name} stars={
                            repoInfo.stargazers_count}/>)
                }

            </div>

        </header>
    );
}

export default Header;
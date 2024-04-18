import RepoInfo from "./RepoInfo/RepoInfo";
import Form from "./Form/Form";
import * as React from "react";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import {Repo} from "../types/Repo";

interface HeaderProps {
    isError: boolean;
    repoInfo?: Repo;
}


const Header: React.FC<HeaderProps> = ({isError, repoInfo}) => {

    if(repoInfo) {
        console.log(repoInfo);
    }

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
                    <RepoInfo isError={isError} repoOwnerUrl={repoInfo.owner.html_url} repoNameUrl={repoInfo.html_url}
                              repoOwner={repoInfo.owner.login} repoName={repoInfo.name}
                              stars={repoInfo.stargazers_count}/>)
                }

            </div>

        </header>
    );
}

export default Header;
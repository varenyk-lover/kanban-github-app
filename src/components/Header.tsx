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
        <header className=" px-8 xl:px-20 lg:px-16 py-5 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
            <div className="h-[215px] sm:h-[250px] mx-auto w-[fit-content] sm:h-[170px] md:h-[110px] flex-col flex justify-between items-center md:items-start">
                <div className=" flex  flex-col md:flex-row  items-center md:items-start justify-between gap-[26px] sm:gap-0  ">

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
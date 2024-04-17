import countStars from "../../utils/countStars";
import {Owner, Repo} from "../../types/Repo";
import * as React from "react";

interface FormInputProps {
    repoOwnerUrl: Owner['html_url'];
    repoNameUrl: Repo['html_url'];
    repoOwner: Owner['login'];
    repoName: Repo['name'];
    stars: Repo['stargazers_count'];
}


const RepoInfo: React.FC<FormInputProps> = ({
                                                repoOwnerUrl,
                                                repoNameUrl,
                                                repoOwner,
                                                repoName,
                                                stars,
                                            }) => {
    const countedStars = countStars(stars);


    return (
        <div className="pt-1 flex gap-2   dark:text-white ">
                    <span className=" text-[#635fc7]  cursor-pointer  hover:underline">
                        <a
                            href={repoOwnerUrl}>{repoOwner.charAt(0).toLocaleUpperCase()+repoOwner.slice(1)}</a>
                    </span>
            <span>&gt;</span>
            <span className="  text-[#635fc7]  cursor-pointer hover:underline">
                        <a
                            href={repoNameUrl}>{repoName.charAt(0).toLocaleUpperCase()+repoName.slice(1)}</a>
                    </span>
            <span>&#11088; {countedStars} stars</span>
        </div>

    );
}

export default RepoInfo;
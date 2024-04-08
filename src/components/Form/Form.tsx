import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {RootState} from "@reduxjs/toolkit/query";
import {repoActions} from "../../redux/repoSlice";
import {useTDispatch, useTSelector} from "../../hooks/reduxHooks";


const Form = () => {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    //Далі 2 групи, які не запам'ятовуються, і містять будь-які знаки окрім риски і пробіла, решта валідації робить гітхаб при створенні репо і акк
    const urlRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;

    const dispatch = useTDispatch();

    const validateUrl = () => {
        if (inputValue && !urlRegex.test(inputValue)) {
            setError("Enter valid URL of the GitHub repo");
        } else if (inputValue.trim().length < 1) {
            setError("URL is required");
        } else {
            setError("");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowLoader(true);
        setError('');
        validateUrl();

        dispatch(repoActions.setRepoUrl(inputValue));
        setInputValue("");
        console.log(inputValue);
        setShowLoader(false);
    };


    return (
        <form onSubmit={handleSubmit} className=" flex gap-6">
            <div className=" flex items-start flex-col min-h-[80px] w-[1000px] space-x-2  md:space-x-4">
                <input
                    className={`p-3 h-[56px] bg-gray-200 w-full rounded-full border-[0.5px] outline-1 ring-0 focus:outline-[#635fc7] ${error ? 'border-[#ff4d4f]' : ''}`}
                    autoComplete="off"
                    placeholder="Enter repo URL" type="text" name="url"
                    value={inputValue} onChange={handleChange}/>
                {error && <div className="text-[#ff4d4f] ">{error}</div>}
            </div>

            <div className=" flex space-x-4 items-start   ">
                <button type="submit"
                        className=" button h-[56px] min-w-[131px] md:block "
                >
                    <span>{showLoader ? ("...Loading") : ("Load issues")}</span>
                </button>
            </div>
        </form>
    );
}

export default Form;
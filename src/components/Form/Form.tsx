import * as React from "react";
import {useState} from "react";
import {kanboardActions} from "../../redux/kanboardSlice";
import {useTDispatch} from "../../hooks/reduxHooks";



const Form = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    //Далі 2 групи, які не запам'ятовуються, і містять будь-які знаки окрім риски і пробіла, решта валідації робить гітхаб при створенні репо і акк
    const urlRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;

    const dispatch = useTDispatch();

    const validateUrl = () => {
        if (inputValue && !urlRegex.test(inputValue)) {
            setErrorMessage("Enter valid URL of the GitHub repo");
        } else if (inputValue.trim().length < 1) {
            setErrorMessage("URL is required");
        } else {
            setErrorMessage("");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        validateUrl();

        dispatch(kanboardActions.setRepoUrl(inputValue));
        setInputValue("");
        console.log(inputValue);
    };


    return (
        <form onSubmit={handleSubmit} className=" flex items-center sm:items-start justify-between flex-col sm:flex-row gap-0 sm:gap-6">
            <div className=" flex  flex-col min-h-[60px] sm:min-h-[80px] 2xl:w-[1000px] xl:w-[800px] lg:w-[600px] md:w-[400px] sm:w-[400px] w-[260px] space-x-2  md:space-x-4">
                <input
                    className={`p-3 h-[46px] sm:h-[56px]  bg-gray-200 w-full rounded-full border-[0.5px] outline-1 ring-0 focus:outline-[#635fc7] ${errorMessage ? 'border-[#ff4d4f]' : ''}`}
                    autoComplete="off"
                    placeholder="Enter repo URL" type="text" name="url"
                    value={inputValue} onChange={handleChange}/>
                {errorMessage && <div className="text-[#ff4d4f] ">{errorMessage}</div>}
            </div>

            <div className=" flex space-x-4 items-start   ">
                <button type="submit" className=" button h-[46px] sm:h-[56px]   w-[131px] md:block text-sm sm:text-lg">
                    Load issues
                </button>
            </div>
        </form>
    );
}

export default Form;
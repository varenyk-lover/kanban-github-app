import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {RootState} from "@reduxjs/toolkit/query";
import {repoActions} from "../../redux/repoSlice";
import {useTDispatch, useTSelector} from "../../hooks/reduxHooks";


interface FormProps {
    handleLoading: void;
}

const Form: React.FC<FormProps> = ({handleLoading}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const url = useTSelector((state) => state.repo.url);
    const dispatch = useTDispatch();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
/*        setIsLoading(true);
        setError(null);*/

        const formData = new FormData(e.currentTarget);
        const url = formData.get("url") as string;

        // Виконати додаткову валідацію URL, якщо потрібно

        dispatch(repoActions.setRepoUrl(url));

        /*
        setIsLoading(false);*/
    };

    return (
        <form className=" flex gap-6">
            <div className=" flex items-center w-[1000px] space-x-2  md:space-x-4">
                <input className=" p-3 h-[56px] bg-gray-200  w-full rounded-full "
                       placeholder="Enter repo URL" type="text" name="url"/>
            </div>

            <div className=" flex space-x-4 items-center   ">
                <button type="submit"
                        className=" button h-[56px] md:block "
                        onSubmit={handleFormSubmit}
                >
                    Load issues
                </button>
            </div>
        </form>
    );
}

export default Form;
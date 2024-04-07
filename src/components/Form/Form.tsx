import * as React from "react";


interface FormProps {
    handleLoading: void;
}

const Form: React.FC<FormProps> = ({ handleLoading }) => {
    return (
        <form className=" flex gap-6">
            <div className=" flex items-center w-[1000px] space-x-2  md:space-x-4">
                <input className=" p-3 h-[56px] bg-gray-200  w-full rounded-full "
                       placeholder="Enter repo URL"/>
            </div>

            <div className=" flex space-x-4 items-center   ">
                <button type="submit"
                        className=" button h-[56px] md:block "
                        onClick={handleLoading}
                >
                    Load issues
                </button>
            </div>
        </form>
    );
}

export default Form;
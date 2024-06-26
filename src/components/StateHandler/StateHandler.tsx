import * as React from "react";


interface StateHandlerProps {
    imgStyles?: string;
    imgSrc?: string;
    message: string;
}

const StateHandler: React.FC<StateHandlerProps> = ({imgStyles, imgSrc, message}) => {
    return (
        <div className="px-[19px]  pt-[0px] sm:pt-[190px]   mx-auto flex align-center  justify-start  flex-col">
            <div
                className="h-[90px]  w-[90px] sm:h-[190px] sm:w-[190px]   mx-auto">
                <img className={imgStyles} src={imgSrc}/>
            </div>
            <p className=" dark:text-white font-bold text-sm sm:text-xl tracking-tighter mt-2 text-gray-500 text-center ">{message}</p>
        </div>
    );
};

export default StateHandler;
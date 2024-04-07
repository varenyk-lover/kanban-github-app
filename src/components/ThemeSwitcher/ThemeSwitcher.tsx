import lightIcon from "../../assets/icon-light-theme.svg";
import {Switch} from "@headlessui/react";
import darkIcon from "../../assets/icon-dark-theme.svg";
import * as React from "react";
import useDarkMode from "../../hooks/useDarkMode";
import {useState} from "react";


const ThemeSwitcher = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <div
            className=" mx-2 rounded-full p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center ">
            <img src={lightIcon} alt="sun indicating light mode"/>

            <Switch
                checked={darkSide}
                onChange={toggleDarkMode}
                className={`${
                    darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
                    <span
                        className={`${
                            darkSide ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
            </Switch>

            <img src={darkIcon} alt="moon indicating dark mode"/>

        </div>
    );
};

export default ThemeSwitcher;
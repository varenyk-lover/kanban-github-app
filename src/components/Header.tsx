import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import useDarkMode from "../hooks/useDarkMode";
import lightIcon from "../assets/icon-light-theme.svg";
import {Switch} from "@headlessui/react";
import darkIcon from "../assets/icon-dark-theme.svg";
import RepoInfo from "./RepoInfo";


const Header = () => {

    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);

    const [colorTheme, setTheme] = useDarkMode();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };




    const handleLoading = (e) => {
        e.preventDefault();
        const getData = async () => {
            const url = "https://api.github.com/repos/facebook/react/issues"; // Приклад URL адреси репозиторію GitHub
            try {
                const res = await fetch(url);
                const issues = await res.json();
                const titles = issues.map(issue => issue.title);
                console.log(titles);
                console.log(issues);
                console.log('Click load btn')
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }
        };

        getData();

    };

    return (
        <header className=" px-20 py-5 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
            <form className="h-[100px]">
                <div className=" flex justify-between   ">

                    {/* Left Side  */}

                    <div className=" flex gap-6">
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
                    </div>

                    {/* Right Side */}
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


                </div>

                {/* for test - check is any board uploaded */}
                {/*{board && <RepoInfo repoOwnerUrl={} repoNameUrl={} repoOwner={} repoName={} stars={}/>}*/}

            </form>

        </header>
    );
}

export default Header;
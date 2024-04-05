import {useSelector} from "react-redux";

const Header = () => {

    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);


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
                <div className=" flex justify-between dark:text-white items-center  ">

                    {/* Left Side  */}
                    <div className=" flex items-center  space-x-2  md:space-x-4">
                        <input className=" p-3 fixed  bg-gray-200 min-w-[880px] rounded-full "
                               placeholder="Enter repo URL"/>
                    </div>

                    {/* Right Side */}

                    <div className=" flex space-x-4 items-center   ">
                        <button type="submit"
                                className=" button  md:block "
                                onClick={handleLoading}
                        >
                            Load issues
                        </button>

                    </div>
                </div>

                {/* for test check is any board */}
                {board && <div className="pt-6 flex gap-2">
                    <span>Repo owner??</span> <span>&gt;</span> <span>Repo name??</span> <span>&#11088; ? K stars</span>
                </div>}

            </form>

        </header>
    );
}

export default Header;
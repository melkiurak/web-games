import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

export const Filters = () => {
    return <div className="flex flex-col gap-8">
        <div className="relative h-[48px]">
            <input className="w-full h-full bg-[#181724] rounded-lg outline-none text-[#BEBEBE] pl-3 " type="text" />
            <div className="absolute flex items-center gap-4 top-2.5 left-3 text-[#BEBEBE]">
                <CiSearch className="text-3xl"/>
                <span>Game Name</span>
            </div>
        </div>
        <div className="flex gap-4 justify-between items-center h-[44px]">
            <button className="">Prev</button>
            <div className="flex flex-wrap  items-center justify-between  max-md:gap-3 w-full h-full overflow-hidden ">
                {['Action','RPG','Samurai','Sports','Shooting','Racing','Survival','Strategy','Battle'].map((filter, index) => (
                    <button className="bg-[#181724] text-white py-1.5 px-6 max-md:px-5 max rounded-3xl max-lg:text-sm" key={index}>{filter}</button>
                ))}
            </div>
            <button>Next</button>
        </div>
        <div className="flex justify-between gap-3 max-lg:gap-9 max-lg:flex-col">
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3 h-[38px]">
                <h4 className="text-white">Platform</h4>
                <button className="rounded-lg bg-[#181724] w-[280px] max-desktop:w-[195.67px] max-lg:w-full  flex justify-between px-3 items-center h-full">
                    <span className=" text-sm text-[#BEBEBE]">All</span>
                    <IoIosArrowDown className="text-xl text-[#FF5733] "/>
                </button>
            </div>
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3 h-[38px]">
                <h4 className="text-white">Platform</h4>
                <button className="rounded-lg bg-[#181724] w-[280px] max-desktop:w-[195.67px] max-lg:w-full  flex justify-between px-3 items-center h-full">
                    <span className=" text-sm text-[#BEBEBE]">Publisher</span>
                    <IoIosArrowDown className="text-xl text-[#FF5733] "/>
                </button>
            </div>
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3 h-[38px]">
                <h4 className="text-white">Platform</h4>
                <button className="rounded-lg bg-[#181724] w-[280px] max-desktop:w-[195.67px] max-lg:w-full flex justify-between px-3 items-center h-full">
                    <span className=" text-sm text-[#BEBEBE]">Players</span>
                    <IoIosArrowDown className="text-xl text-[#FF5733] "/>
                </button>
            </div>
        </div>
        <div className="flex justify-between gap-9">
            <div className="flex items-center gap-4 flex-1">
                <label htmlFor="" className="text-white">Release Year</label>
                <div className="flex flex-col gap-[10px] w-[266px]">
                    <input type="range" min={1} max={24} />
                    <div className="flex justify-between text-white text-sm">
                        <p>2000</p>
                        <p>2024</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 flex-1">
                <label htmlFor="" className="text-white">Rating</label>
                <div className="flex flex-col gap-[10px] w-[266px]">
                    <input type="range" min={1} max={10}/>
                    <div className="flex justify-between text-white text-sm">
                        <p>0</p>
                        <p>10</p>
                    </div>
                </div>
            </div>
        </div>
        <button className="opaqueButton w-full py-[7.5px] rounded-2xl flex justify-center items-center gap-2">
            <CiSearch className="text-xl"/>
            <span>Search For Games</span>
        </button>
    </div>
}
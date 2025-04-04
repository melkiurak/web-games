import {  useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

export const Filters = ({dataGames, setResultSearch}) => {
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    const [nameValue, setNameValue] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    //Slider genre
    const [slide, setSlide] = useState(0);
    const visibleCount = 9;
    const genre = ['Action', 'RPG', 'Samurai', 'Sports', 'Shooting', 'Racing', 'Survival', 'Strategy', 'Battle','Adventure','Puzzle', 'Horror','Fighting','Simulation','Open World','Stealth','Platformer','Indie','MOBA', 'MMORPG', 'Sandbox', 'Idle','Card','VR','Tactical','Hunting','Multiplayer','Co-op',];
    const handelGenreGame = useCallback(() => {
        const genreGame = dataGames?.games?.edges.filter(edge => edge.node.genre.value).map(edge => edge.node.genre.value);
        if(genreGame.includes(genre))
    }, [dataGames]);
    const buttonNext = () => {
        if (slide < genre.length - visibleCount) {
            setSlide(slide + 1);
        }
    }

    const buttonPrev = () => {
        if (slide > 0) {
            setSlide(slide - 1);
        }
    }
    
    const handleInputChange  = (event) => {
        setNameValue(event.target.value);
        setValidationMessage('');
    };
    
    const CheckInput = useCallback(() => {
        const nameGame = dataGames?.games?.edges.filter(edge => edge.node.name).map(edge => edge.node.name.replace(/\s+/g, " ").toLowerCase());
        if (nameGame?.includes(nameValue.replace(/\s+/g, " ").toLowerCase())) {
            setValidationMessage('');
        } else {
            setValidationMessage('Такого имени нет'); 
        }
    },[dataGames, nameValue]);

    const SearchInput = useCallback(() => {
        if (!nameValue.trim()) {
            return setResultSearch([]);
        }
        const foundGameName = dataGames?.games.edges.filter(edge => 
            edge.node.name.replace(/\s+/g, " ").toLowerCase().includes(nameValue.replace(/\s+/g, " ").toLowerCase())
        );
        if (foundGameName && foundGameName.length > 0) {
            setResultSearch(foundGameName.map(edge => edge.node));
        } else {
            setResultSearch([]);
        }
        CheckInput(); 
    }, [nameValue, dataGames, setResultSearch, CheckInput]);

    const handelSearchGame = useCallback(() => {
        SearchInput();
        handelGenreGame();
    }, [SearchInput, handelGenreGame]);

    useEffect(() => {
        handelSearchGame();
    }, [handelSearchGame, nameValue]);
    return <div className="flex flex-col gap-8">
        <form className="relative h-[48px]">
            <input className="w-full h-full bg-[#181724] rounded-lg outline-none text-[#BEBEBE] pl-3 " type="text" onFocus={() => setIsPlaceholderVisible(false)} onBlur={(e) => setIsPlaceholderVisible(!e.target.value)} onChange={handleInputChange} />
            {isPlaceholderVisible && (
                <div className={`absolute flex items-center gap-4 top-2.5 left-3 text-[#BEBEBE] pointer-events-none`}>
                    <CiSearch className="text-3xl"/>
                    <span>Game Name</span>
                </div>
            )}
            {validationMessage && (
                <p className="text-red-500">{validationMessage}</p>
            )}
        </form>
        <div className="flex gap-4 justify-between items-center h-[44px]">
            <button className="buttonSwitch flex-0 z-20 px-3 py-[6px]" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
            <div className="flex items-center justify-between  max-md:gap-3 w-full h-full overflow-hidden">
                {genre.slice(slide, slide + visibleCount).map((filter, index) => (
                    <button className="bg-[#181724] text-white py-1.5 px-6 max-md:px-5 max rounded-3xl max-lg:text-sm cursor-pointer focus:bg-[#FF5733]" key={index}>{filter}</button>
                ))}
            </div>
            <button className={`buttonSwitch  flex-0 px-3 py-[6px]  ${slide < genre.length - 1 ? 'cursor-pointer' : 'cursor-auto'}`} style={{border: slide < genre.length - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext} ><GrLinkNext style={{color: slide < genre.length - 1 ? '#FFFFFF' : '#979797'}} /></button>
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
        <button className="opaqueButton w-full py-[7.5px] rounded-2xl flex justify-center items-center gap-2" onClick={handelSearchGame}>
            <CiSearch className="text-xl"/>
            <span>Search For Games</span>
        </button>
    </div>
}
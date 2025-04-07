import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

export const Filters = ({ dataGames, setResultSearch, visibleCount }) => {
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    const [validationMessage, setValidationMessage] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [yearValue, setYearValue] = useState('');
    const [ratingValue, setRatingValue] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedPublishers, setSelectedPublishers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [slide, setSlide] = useState(0);
    const [platformVisible, setPlatformVisible] = useState(false);
    const [publishersVisible, setPublishersVisible] = useState(false);
    const [playersVisible, setPlayersVisible] = useState(false);
    const [isFreeToPlay, setIsFreeToPlay] = useState(false);
    const [isOnline, setIsOnline] = useState(false);

    const genre = ['Action', 'Action RPG', 'Open World', 'RPG', 'Soulslike', 'Samurai', 'Sports', 'Shooting', 'Racing', 'Survival', 'Strategy', 'Battle', 'Adventure', 'Puzzle', 'Horror', 'Fighting', 'Simulation', 'Stealth', 'Platformer', 'Indie', 'MOBA', 'MMORPG', 'Sandbox', 'Idle', 'Card', 'VR', 'Tactical', 'Hunting', 'Multiplayer'];
    const platform = ["PC", "PS 5", "PS 4", "Xbox Series X", "Xbox Series S", "Xbox One", 'Xbox'];
    const publishers = ["Sony Interactive Entertainment", "Microsoft Studios", "Nintendo", "Electronic Arts (EA)", "Ubisoft", "Rockstar Games", "Bethesda Softworks", "Activision", "2K Games", "Square Enix", "Bandai Namco", "CD Projekt", "Capcom", "SEGA", "Blizzard Entertainment", "Epic Games", "Tencent Games", "Paradox Interactive", "Devolver Digital", "Focus Entertainment", "FromSoftware"];
    const players = ["Single-player", "Multiplayer", "Online Multiplayer", "Local Multiplayer", "Split-screen", "Co-op", "Online Co-op", "LAN Multiplayer", "PvP", "MMO"];

    const handleInputChange = (event) => {
        setNameValue(event.target.value);
        setValidationMessage('');
    };
 
    const CheckInput = useCallback(() => {
        const nameGame = dataGames?.games?.edges.filter(edge => edge.node.name).map(edge => edge.node.name.replace(/\s+/g, '').toLowerCase());
        if (nameGame?.includes(nameValue.replace(/\s+/g, '').toLowerCase())) {
            setValidationMessage('');
        } else {
            setValidationMessage('Такого имени нет');
        }
    }, [dataGames, nameValue]);

    const filterGames = useCallback(() => {
        let filteredGames = dataGames?.games?.edges || [];

        if (nameValue.trim()) {
            filteredGames = filteredGames.filter(edge =>edge?.node?.name?.toLowerCase().includes(nameValue.toLowerCase()));
        }
        if (selectedGenres.length > 0) {
            filteredGames = filteredGames.filter(edge => edge?.node?.genre?.some(g => selectedGenres.map(sg => sg.toLowerCase()).includes(g.value.toLowerCase())));
        }
        if (selectedPlatforms.length > 0) {
            filteredGames = filteredGames.filter(edge => edge?.node?.platform?.some(p => selectedPlatforms.map(sp => sp.toLowerCase()).includes(p.value.toLowerCase())));
        }

        if (selectedPublishers.length > 0) {
            filteredGames = filteredGames.filter(edge => selectedPublishers.map(sp => sp.toLowerCase()).includes(edge?.node?.Publisher?.toLowerCase()));
        }

        if (selectedPlayers.length > 0) {
            filteredGames = filteredGames.filter(edge => edge?.node?.players?.some(p => selectedPlayers.map(sp => sp.toLowerCase()).includes(p.value.toLowerCase())));
        }
        if (yearValue) {
            filteredGames = filteredGames.filter(edge => new Date(edge.node.date).getFullYear() === parseInt(yearValue, 10));
        }
        if (ratingValue) {
            filteredGames = filteredGames.filter(edge => Math.round(edge.node.metacriticScore / 10) === parseInt(ratingValue, 10));
        }
        if (isFreeToPlay) {
            filteredGames = filteredGames.filter(edge => edge.node.price === 0 || edge.node.price === null);
        }
        if (isOnline) {
            filteredGames = filteredGames.filter(edge =>edge?.node?.players?.some(o => o?.value?.toLowerCase().includes('online')));
        }
        setResultSearch(filteredGames.map(edge => edge.node));
    }, [dataGames, setResultSearch, nameValue, selectedGenres, selectedPlatforms, selectedPublishers, selectedPlayers, yearValue, ratingValue, isFreeToPlay, isOnline]);

    const SearchInput = useCallback(() => {
        filterGames();
        CheckInput();
    }, [filterGames, CheckInput]);

    const GenresFilter = (genreName) => {
        setSelectedGenres(prev => prev.includes(genreName) ? prev.filter(g => g !== genreName) : [...prev, genreName]);
    };
    const handelPlarformsFilter = useCallback((platform) => {
        setPlatformVisible(false);
        setSelectedPlatforms(prev => prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]);
    }, []);

    const handelPublishersFilter = useCallback((publisher) => {
        setPublishersVisible(false);
        setSelectedPublishers(prev => prev.includes(publisher) ? prev.filter(p => p !== publisher) : [...prev, publisher]);
    }, []);

    const handelPlayersFilter = useCallback((players) => {
        setPlayersVisible(false);
        setSelectedPlayers(prev => prev.includes(players) ? prev.filter(p => p !== players) : [...prev, players]);
    }, []);

    const buttonNext = () => {
        if (slide < genre.length - visibleCount) {
            setSlide(slide + 1);
        }
    };

    const buttonPrev = () => {
        if (slide > 0) {
            setSlide(slide - 1);
        }
    };

    const handelSearchGame = useCallback(() => {
        filterGames();
    }, [filterGames]);

    useEffect(() => {
        filterGames();
    }, [selectedGenres, selectedPlatforms, selectedPublishers, selectedPlayers, yearValue, ratingValue, isFreeToPlay, isOnline, filterGames]);

    return <div className="flex flex-col gap-8">
        <form className="relative h-[48px]">
            <input className="w-full h-full bg-[#181724] rounded-lg outline-none text-[#BEBEBE] pl-3 " type="text" onFocus={() => setIsPlaceholderVisible(false)} onBlur={(e) => setIsPlaceholderVisible(!e.target.value)} onChange={(event) => {handleInputChange(event); SearchInput(event)}} />
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
        <div className="flex gap-4 max-lg:gap-2 justify-between items-center h-[44px]">
            <button className="buttonSwitch flex-0 z-20 px-3 py-[6px]" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
            <div className="flex items-center justify-between  max-md:gap-3 w-full h-full overflow-hidden">
                {genre.slice(slide, slide + visibleCount).map((filter, index) => (
                    <button className={` text-white py-1.5 px-6 max-md:px-5 max rounded-3xl max-lg:text-sm cursor-pointer  ${selectedGenres.includes(filter) ? 'bg-[#FF5733]' : 'bg-[#181724]'} truncate`} key={index} onClick={() => {GenresFilter(filter)}}>{filter}</button>
                ))}
            </div>
            <button className={`buttonSwitch  flex-0 px-3 py-[6px]  ${slide < genre.length - visibleCount ? 'cursor-pointer' : 'cursor-auto'}`} style={{border: slide < genre.length - visibleCount  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext} ><GrLinkNext style={{color: slide < genre.length - visibleCount ? '#FFFFFF' : '#979797'}} /></button>
        </div>
        <div className="flex justify-between gap-3 max-lg:gap-9 max-lg:flex-col">
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3 ">
                <h4 className="text-white">Platform</h4>
                <div className="w-[280px] max-desktop:w-[195.67px] max-lg:w-full relative py-2">
                    <button className="rounded-lg bg-[#181724] w-full flex justify-between px-3 items-center h-full cursor-pointer" onClick={() => setPlatformVisible(prev => !prev)}>
                        <span className=" text-sm text-[#BEBEBE] py-2">{selectedPlatforms.length > 0 ? selectedPlatforms.join(', ') : 'All'}</span>
                        <IoIosArrowDown className={`text-xl text-[#FF5733] ${platformVisible ? 'rotate-180' : "rotate-0"}`}/>
                    </button>
                    {platformVisible && (
                        <div className="absolute top-full mt-1 bg-[#181724] w-full rounded-lg z-10 shadow-lg flex flex-col">
                            {platform.map((platform, index) => (
                                <button key={index} className="px-3 py-2 text-sm text-white hover:bg-[#2a2938] cursor-pointer truncate w-full text-start" onClick={(() => handelPlarformsFilter(platform))}>{platform}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3">
                <h4 className="text-white">Publisher</h4>
                <div className="w-[280px] max-desktop:w-[195.67px] max-lg:w-full py-2 relative">
                    <button className="w-full rounded-lg bg-[#181724] flex justify-between px-3 items-center py-2 cursor-pointer" onClick={() => setPublishersVisible(prev => !prev)}>
                        <span className=" text-sm text-[#BEBEBE]">{selectedPublishers.length > 0 ? selectedPublishers.join(', ') : 'All'}</span>
                        <IoIosArrowDown className={`text-xl text-[#FF5733] ${publishersVisible ? 'rotate-180' : "rotate-0"}`}/>
                    </button>
                    {publishersVisible && (
                        <div className="absolute top-full mt-1 bg-[#181724] w-full rounded-lg z-10 shadow-lg flex flex-col items-start">
                            {publishers.map((publishers, index) => (
                                <button key={index} className="px-3 py-2 text-sm text-white hover:bg-[#2a2938] cursor-pointer truncate" onClick={(() => handelPublishersFilter(publishers))}>{publishers}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3">
                <h4 className="text-white">Players</h4>
                <div  className="w-[280px] max-desktop:w-[195.67px] max-lg:w-full py-2 relative">
                    <button className="w-full rounded-lg bg-[#181724]  flex justify-between px-3 items-center py-2 cursor-pointer" onClick={() => setPlayersVisible(prev => !prev)}>
                        <span className=" text-sm text-[#BEBEBE]">{selectedPlayers.length > 0 ? selectedPlayers.join(', ') : 'All'}</span>
                        <IoIosArrowDown className={`text-xl text-[#FF5733] ${playersVisible ? 'rotate-180' : "rotate-0"}`}/>
                    </button>
                    {playersVisible && (
                        <div className="absolute top-full mt-1 bg-[#181724] w-full rounded-lg z-10 shadow-lg flex flex-col items-start">
                            {players.map((players, index) => (
                                <button key={index} className="px-3 py-2 text-sm text-white hover:bg-[#2a2938] cursor-pointer truncate" onClick={(() => handelPlayersFilter(players))}>{players}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="flex max-lg:flex-col justify-between gap-9 max-desktop:gap-6">
            <div className="flex max-lg:flex-col items-center max-lg:items-start gap-4 flex-1">
                <label htmlFor="" className="text-white">Release Year</label>
                <div className="flex flex-col gap-[10px] w-full">
                    <input type="range" min={2000} max={2024} className="custom-range w-full h-5 rounded-full appearance-none relative" onChange={(event) => {setYearValue(event.target.value)}} value={yearValue} />
                    <div className="flex justify-between text-white text-sm">
                        <p>2000</p>
                        <p>2024</p>
                    </div>
                </div>
            </div>
            <div className="flex max-lg:flex-col items-center max-lg:items-start gap-4 flex-1">
                <label htmlFor="" className="text-white">Rating</label>
                <div className="flex flex-col gap-[10px] w-full" >
                    <input type="range" min={1} max={10} className="custom-range w-full h-5 rounded-full appearance-none relative" value={ratingValue} onChange={(event) => {setRatingValue(event.target.value)}}/>
                    <div className="flex justify-between text-white text-sm">
                        <p>0</p>
                        <p>10</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 gap-24 max-desktop:gap-[18px]">
                <div className="flex items-center justify-between max-lg:justify-start max-lg:gap-4  flex-1">
                    <span className="text-white text-xl ">Online</span>
                    <label className="relative inline-block w-[50px] h-6">
                        <input type="checkbox" className="opacity-0 w-0 h-0" checked={isOnline} onChange={() => {setIsOnline(prev => !prev);}} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="flex items-center justify-between max-lg:justify-end max-lg:gap-4 flex-1">
                    <span className="text-white text-xl ">Free</span>
                    <label className="relative inline-block w-[50px] h-6">
                        <input type="checkbox" className="opacity-0 w-0 h-0" checked={isFreeToPlay} onChange={() => {setIsFreeToPlay(prev => !prev)}} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
        <button className="opaqueButton w-full py-[7.5px] rounded-2xl flex justify-center items-center gap-2" onClick={handelSearchGame} >
            <CiSearch className="text-xl"/>
            <span>Search For Games</span>
        </button>
    </div>
}
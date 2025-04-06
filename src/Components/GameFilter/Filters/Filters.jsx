import {  useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

export const Filters = ({dataGames, setResultSearch,visibleCount}) => {
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    const [validationMessage, setValidationMessage] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [yearValue, setYearValue] = useState('');
    const [ratingValue, setRatingValue] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [slide, setSlide] = useState(0);
    const [platformVisible, setPlatformVisible] = useState(false);    
    const [publishersVisible, setPublishersVisible] = useState(false);
    const [playersVisible, setPlayersVisible] = useState(false);
    const [isFreeToPlay, setIsFreeToPlay] = useState(false);
    const [isOnline, setIsOnline] = useState(false);

    const genre = ['Action','Action RPG', 'Open World', 'RPG', 'Soulslike', 'Samurai', 'Sports', 'Shooting', 'Racing', 'Survival', 'Strategy', 'Battle','Adventure','Puzzle', 'Horror','Fighting','Simulation','Stealth','Platformer','Indie','MOBA', 'MMORPG', 'Sandbox', 'Idle','Card','VR','Tactical','Hunting','Multiplayer',];
    const platform = ["PC", "PS 5","PS 4","Xbox Series X","Xbox Series S", "Xbox One", 'Xbox'];
    const publishers = ["Sony Interactive Entertainment","Microsoft Studios","Nintendo","Electronic Arts (EA)","Ubisoft","Rockstar Games","Bethesda Softworks","Activision","2K Games","Square Enix","Bandai Namco","CD Projekt","Capcom","SEGA","Blizzard Entertainment","Epic Games","Tencent Games","Paradox Interactive","Devolver Digital","Focus Entertainment","FromSoftware"];
    const players = ["Single-player","Multiplayer","Online Multiplayer","Local Multiplayer","Split-screen","Co-op","Online Co-op","LAN Multiplayer","PvP", "MMO" ];
      
    const handleInputChange  = (event) => {
        setNameValue(event.target.value);
        setValidationMessage('');
    };
    const handelInputYearChange = (event) => {
        setYearValue(event.target.value)
    };
    const handelInputRatingChange = (event) => {
        setRatingValue(event.target.value)
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
        const foundGameName = dataGames?.games.edges.filter(edge => edge.node.name.replace(/\s+/g, " ").toLowerCase().includes(nameValue.replace(/\s+/g, " ").toLowerCase()));
        if (foundGameName && foundGameName.length > 0) {
            setResultSearch(foundGameName.map(edge => edge.node));
        } else {
            setResultSearch([]);
        }
        CheckInput(); 
    },[dataGames, CheckInput, nameValue, setResultSearch]);
    const toggleButton = (genreName) => {
        setSelectedGenres(selectedGenre => {
            if (selectedGenre.includes(genreName)) {
                return selectedGenre.filter(genre => genre !== genreName);
            } else {
                return [...selectedGenre, genreName];
            }
        });        
    };
    const handelGenreGame = useCallback(() => {
        const genreAll = Array.isArray(selectedGenres)  ? selectedGenres.join(',').toLowerCase().replace(/\s+/g, '') : selectedGenres.toLowerCase().replace(/\s+/g, '');
        setResultSearch(dataGames?.games?.edges.filter(edge => edge?.node?.genre?.some(g => genreAll.includes(g.value.toLowerCase().replace(/\s+/g, '')))).map(edge => edge.node));
    }, [dataGames, selectedGenres, setResultSearch]);  
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
    const handelPlarform = () => {
        setPlatformVisible(prev => !prev);
    };
    const handelPublishers = () => {
        setPublishersVisible(prev => !prev);
    };
    const handelPlayers = () => {
        setPlayersVisible(prev => !prev);
    };
    const handelPlarformsFilter = (platform) => {
        const cleanPlatform = platform.toLowerCase().replace(/\s+/g, '');
        const resultsPlatfotms = dataGames?.games?.edges.filter(edge => edge.node.platform.some(p => cleanPlatform === p.value.toLowerCase().replace(/\s+/g, ''))).map(edge => edge.node);        
        console.log(cleanPlatform, resultsPlatfotms)
        setResultSearch(resultsPlatfotms);
        setPlatformVisible(false);
    };
    const handelPublishersFilter = (publisher) => {
       const cleanPublisher = publisher.toLowerCase().replace(/\s+/g, '');
       const resultsPublisher = dataGames?.games?.edges.filter(edge =>{return cleanPublisher  === edge.node.Publisher.toLowerCase().replace(/\s+/g, '')}).map(edge => edge.node);
       setResultSearch(resultsPublisher); 
       setPublishersVisible(false);
    };
    const handelPlayersFilter = (players) => {
        const cleanPlayers = players.toLowerCase().replace(/\s+/g, '');
        const resultsPlayers = dataGames?.games?.edges.filter(edge => edge.node.players.some(p => cleanPlayers === p.value.toLowerCase().replace(/\s+/g, ''))).map(edge => edge.node);
        setResultSearch(resultsPlayers);
        setPlayersVisible(false);
    };
    const yearFilter = useCallback(() => {
        const filteredGames = dataGames?.games?.edges.filter(edge => new Date(edge.node.date).getFullYear() == yearValue).map(edge => edge.node);
        setResultSearch(filteredGames);
    }, [dataGames, setResultSearch,yearValue]);

    const ratingFilter = useCallback(() => {
        const allRatingGames = dataGames?.games?.edges.filter(edge => Math.round(edge.node.metacriticScore / 10) === parseFloat(ratingValue)).map(edge => edge.node);
        setResultSearch(allRatingGames)
    }, [setResultSearch, ratingValue, dataGames])

    const freeToPLayFilter = useCallback(() => {
        if(isFreeToPlay){
            setResultSearch(dataGames?.games?.edges.filter(edge => edge.node.price === 0 || edge.node.price == null))
        } else{
            setResultSearch([]);
        };
    },[dataGames, setResultSearch, isFreeToPlay])

    const onlineFilter = useCallback(() => {
        const game = dataGames?.games?.edges?.filter(edge => edge?.node?.players?.some(o => o?.value?.toLowerCase().includes('online')))
        if(isOnline){
            setResultSearch(game)
        } else {
            setResultSearch([]);
        }
    },[dataGames, setResultSearch, isOnline])

    const handelSearchGame = useCallback(() => {
        SearchInput();
    
        if (selectedGenres.length > 0) {
            handelGenreGame();
        }
    }, [SearchInput, handelGenreGame, selectedGenres]);

    useEffect(() => {
        handelSearchGame();
        yearFilter();
        ratingFilter();
        freeToPLayFilter();
        onlineFilter();
    },[nameValue, selectedGenres, handelSearchGame, yearFilter, ratingFilter,freeToPLayFilter,onlineFilter]);
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
        <div className="flex gap-4 max-lg:gap-2 justify-between items-center h-[44px]">
            <button className="buttonSwitch flex-0 z-20 px-3 py-[6px]" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
            <div className="flex items-center justify-between  max-md:gap-3 w-full h-full overflow-hidden">
                {genre.slice(slide, slide + visibleCount).map((filter, index) => (
                    <button className={` text-white py-1.5 px-6 max-md:px-5 max rounded-3xl max-lg:text-sm cursor-pointer  ${selectedGenres.includes(filter) ? 'bg-[#FF5733]' : 'bg-[#181724]'} truncate`} key={index} onClick={() => {toggleButton(filter)}}>{filter}</button>
                ))}
            </div>
            <button className={`buttonSwitch  flex-0 px-3 py-[6px]  ${slide < genre.length - visibleCount ? 'cursor-pointer' : 'cursor-auto'}`} style={{border: slide < genre.length - visibleCount  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext} ><GrLinkNext style={{color: slide < genre.length - visibleCount ? '#FFFFFF' : '#979797'}} /></button>
        </div>
        <div className="flex justify-between gap-3 max-lg:gap-9 max-lg:flex-col">
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3 h-[38px]">
                <h4 className="text-white">Platform</h4>
                <div className="w-[280px] max-desktop:w-[195.67px] max-lg:w-full h-full relative">
                    <button className="rounded-lg bg-[#181724] w-full flex justify-between px-3 items-center h-full" onClick={handelPlarform}>
                        <span className=" text-sm text-[#BEBEBE]">All</span>
                        <IoIosArrowDown className={`text-xl text-[#FF5733] ${platformVisible ? 'rotate-180' : "rotate-0"}`}/>
                    </button>
                    {platformVisible && (
                        <div className="absolute top-full mt-1 bg-[#181724] w-full rounded-lg z-10 shadow-lg flex flex-col items-start">
                            {platform.map((platform, index) => (
                                <button key={index} className="px-3 py-2 text-sm text-white hover:bg-[#2a2938] cursor-pointer truncate" onClick={(() => handelPlarformsFilter(platform))}>{platform}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3 h-[38px]">
                <h4 className="text-white">Platform</h4>
                <div className="w-[280px] max-desktop:w-[195.67px] max-lg:w-full h-full relative">
                    <button className="w-full rounded-lg bg-[#181724] flex justify-between px-3 items-center h-full" onClick={handelPublishers}>
                        <span className=" text-sm text-[#BEBEBE]">Publisher</span>
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
            <div className="flex items-center justify-between gap-5 max-desktop:gap-3 h-[38px]">
                <h4 className="text-white">Platform</h4>
                <div  className="w-[280px] max-desktop:w-[195.67px] max-lg:w-full h-full relative">
                    <button className="w-full rounded-lg bg-[#181724]  flex justify-between px-3 items-center h-full" onClick={handelPlayers}>
                        <span className=" text-sm text-[#BEBEBE]">Players</span>
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
        <div className="flex justify-between gap-9">
            <div className="flex items-center gap-4 flex-1">
                <label htmlFor="" className="text-white">Release Year</label>
                <div className="flex flex-col gap-[10px] w-[266px]">
                    <input type="range" min={2000} max={2024} className="custom-range w-full h-5 rounded-full appearance-none relative" onChange={handelInputYearChange} value={yearValue} />
                    <div className="flex justify-between text-white text-sm">
                        <p>2000</p>
                        <p>2024</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 flex-1">
                <label htmlFor="" className="text-white">Rating</label>
                <div className="flex flex-col gap-[10px] w-[266px]" >
                    <input type="range" min={1} max={10} className="custom-range w-full h-5 rounded-full appearance-none relative" value={ratingValue} onChange={handelInputRatingChange}/>
                    <div className="flex justify-between text-white text-sm">
                        <p>0</p>
                        <p>10</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 gap-24">
                <div className="flex items-center  justify-between  flex-1">
                    <span className="text-white text-xl ">Online</span>
                    <label className="relative inline-block w-[50px] h-6">
                        <input type="checkbox" className="opacity-0 w-0 h-0" checked={isOnline} onChange={() => setIsOnline(prev => !prev)} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="flex items-center  justify-between flex-1">
                    <span className="text-white text-xl ">Free</span>
                    <label className="relative inline-block w-[50px] h-6">
                        <input type="checkbox" className="opacity-0 w-0 h-0" checked={isFreeToPlay} onChange={() => setIsFreeToPlay(prev => !prev)} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
        <button className="opaqueButton w-full py-[7.5px] rounded-2xl flex justify-center items-center gap-2" onClick={handelSearchGame}>
            <CiSearch className="text-xl"/>
            <span>Search For Games</span>
        </button>
    </div>
}
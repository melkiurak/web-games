import { getMetaDate } from "@/Service/filters.service";
import { Genre, IAllMetadata } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

export const Filters = ({selectedGenres, setSelectedGenres}:any) => {
    const [metaData, setMetaData] = useState<IAllMetadata | null>(null)
    const [slide, setSlide] = useState(0);

    const scrollRef = useRef<HTMLDivElement>(null);

    const buttonNext = () => {
        scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
    };

    const buttonPrev = () => {
        scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
    };
    const toggleGenre = (genre: Genre) => {
        const isSelected = selectedGenres.some((g:Genre) => g.name === genre.name);
        const nextGenres = isSelected 
            ? selectedGenres.filter((g:Genre) => g.name !== genre.name)
            : [...selectedGenres, genre];
            
        setSelectedGenres(nextGenres);
    };
    
    useEffect(() => {
        const responseDate = async() => {
            const request = await getMetaDate();
            setMetaData(request)
        }
        responseDate()
    }, [])
    return <div className="flex flex-col gap-8">
        {/*<form className="relative h-[48px]">
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
        </form>*/}
        <div className="flex gap-4 max-lg:gap-2 justify-between items-center h-[44px]">
            <button className="buttonSwitch flex-0 z-20 px-3 py-[6px]" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
            <div ref={scrollRef} className="flex items-center justify-between gap-5 max-md:gap-3 w-full h-full overflow-hidden">
                {metaData?.genres.map((genre, index) => (
                    <button className={`flex-shrink-0 whitespace-nowrap text-white py-1.5 px-6 max-md:px-5 max rounded-3xl max-lg:text-sm cursor-pointer duration-300 ease-in hover:bg-[#FF5733]  ${selectedGenres.includes(genre) ? 'bg-[#FF5733]' : 'bg-[#181724]'} truncate`} key={index} onClick={() => {toggleGenre(genre)}}>{genre.name}</button>
                ))}
            </div>
            <button className={`buttonSwitch  flex-0 px-3 py-[6px]  ${slide < (metaData?.genres.length ?? 0)  - 8 ? 'cursor-pointer' : 'cursor-auto'}`} style={{border: slide < (metaData?.genres.length ?? 0) - 8  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext} ><GrLinkNext style={{color: slide < (metaData?.genres.length ?? 0) - 8 ? '#FFFFFF' : '#979797'}} /></button>
        </div>
        {/*<div className="flex justify-between gap-3 max-lg:gap-9 max-lg:flex-col">
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
        */}
    </div>
}
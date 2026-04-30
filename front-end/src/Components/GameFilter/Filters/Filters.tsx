import { getMetaDate } from "@/Service/filters.service";
import { Category, Genre, IAllMetadata, Platform, Publisher } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

export const Filters = ({selectedGenres, setSelectedGenres, selectedPlatforms, setSelectedPlatforms, selectedPublishers, setSelectedPublishers,selectedCategories, setSelectedCategories, module}:any) => {
    const [metaData, setMetaData] = useState<IAllMetadata | null>(null)
    const [slide, setSlide] = useState(0);
    const [platformVisible, setPlatformVisible] = useState(false)
    const [publisherVisible, setPublisherVisible] = useState(false)
    const [playerVisible, setPlayerVisible] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null);


    const buttonNext = () => {
        scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
    };

    const buttonPrev = () => {
        scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
    };
    const toggleItem = <ItemType extends {name: string} >(item: ItemType, selectedItem: ItemType[], setSelectedItem:(items: ItemType[]) => void) => {
        const isSelected = selectedItem.some((i) => i.name === item.name)
        const nextIntems = isSelected ? selectedItem.filter(i => i.name !== item.name) : [...selectedItem, item];
        setSelectedItem(nextIntems);
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
        <div className="flex gap-4 max-lg:gap-2 justify-between items-center h-11">
            <button className="buttonSwitch flex-0 z-20 px-3 py-1.5" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
            <div ref={scrollRef} className="flex items-center justify-between gap-5 max-md:gap-3 w-full h-full overflow-hidden">
                {metaData?.genres.map((genre, index) => (
                    <button className={`shrink-0 whitespace-nowrap text-white py-1.5 px-6 max-md:px-5 max rounded-3xl max-lg:text-sm cursor-pointer duration-300 ease-in hover:bg-[#FF5733]  ${selectedGenres.some((g: any) => g.name === genre.name) ? 'bg-[#FF5733]' : 'bg-[#181724]'} truncate`} key={index} onClick={() => {toggleItem(genre, selectedGenres, setSelectedGenres)}}>{genre.name}</button>
                ))}
            </div>
            <button className={`buttonSwitch  flex-0 px-3  py-1.5  ${slide < (metaData?.genres.length ?? 0)  - 8 ? 'cursor-pointer' : 'cursor-auto'}`} style={{border: slide < (metaData?.genres.length ?? 0) - 8  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext} ><GrLinkNext style={{color: slide < (metaData?.genres.length ?? 0) - 8 ? '#FFFFFF' : '#979797'}} /></button>
        </div>
        <div className="flex justify-between gap-3 max-lg:gap-9 max-lg:flex-col">
            <div className={module['filter-unit-container']}>
                <h4 className="text-white">Platform</h4>
                <div className={module['filter-select-wrapper']}>
                    <button className={module['filter-select-trigger']} onClick={() => setPlatformVisible(prev => !prev)}>
                        <span className=" text-sm text-[#BEBEBE] py-2">{selectedPlatforms.length > 0 ? selectedPlatforms.map((p:Platform) => p.name).join(',  ') : 'All'}</span>
                        <IoIosArrowDown className={`${module['filter-arrow-icon']} ${platformVisible ? 'rotate-180' : "rotate-0"}`}/>
                    </button>
                    {platformVisible && (
                        <div className={module['filter-dropdown-menu']}>
                            {metaData?.platforms.map((platform, index) => (
                                <button key={index} className={module['filter-dropdown-item']} onClick={(() => toggleItem(platform, selectedPlatforms, setSelectedPlatforms))}>{platform.name}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={module['filter-unit-container']}>
                <h4 className="text-white">Publisher</h4>
                <div className={module['filter-select-wrapper']}>
                    <button className={module['filter-select-trigger']} onClick={() => setPublisherVisible(prev => !prev)}>
                        <span className=" text-sm text-[#BEBEBE] py-2">{selectedPublishers.length > 0 ? selectedPublishers.map((p:Publisher) => p.name).join(', ') : 'All'}</span>
                        <IoIosArrowDown className={`${module['filter-arrow-icon']} ${platformVisible ? 'rotate-180' : "rotate-0"}`}/>
                    </button>
                    {publisherVisible && (
                        <div className={module['filter-dropdown-menu']}>
                            {metaData?.publishers.map((publisher, index) => (
                                <button key={index} className={module['filter-dropdown-item']} onClick={(() => toggleItem(publisher, selectedPublishers, setSelectedPublishers))}>{publisher.name}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={module['filter-unit-container']}>
                <h4 className="text-white">Players</h4>
                <div className={module['filter-select-wrapper']}>
                    <button className={module['filter-select-trigger']} onClick={() => setPlayerVisible(prev => !prev)}>
                        <span className=" text-sm text-[#BEBEBE] py-2">{selectedCategories.length > 0 ? selectedCategories.map((c:Category) => c.name).join(', ') : 'All'}</span>
                        <IoIosArrowDown className={`${module['filter-arrow-icon']} ${platformVisible ? 'rotate-180' : "rotate-0"}`}/>
                    </button>
                    {playerVisible && (
                        <div className={module['filter-dropdown-menu']}>
                            {metaData?.categories.map((category, index) => (
                                <button key={index} className={module['filter-dropdown-item']} onClick={(() => toggleItem(category, selectedCategories, setSelectedCategories))}>{category.name}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        {/*<div className="flex max-lg:flex-col justify-between gap-9 max-desktop:gap-6">
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
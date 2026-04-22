import React, { useEffect, useState } from "react";
import date from '../../assets/Hero/date.png'
import matacritic from '../../assets/Hero/metacritic.png';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { GameCardPreview } from "@/types";
import { getGames } from "@/Service/gamedata";
import { useGetData } from "@/hooks/useGetData";

export const Hero = ({}) => {
    const {data, loading, error} = useGetData('mostPopular', 5);
    const [slide, setSlide] = useState(0);
    const background = data.filter(g => g.screenshots[1]);
    const platformShortNames = {
        "PC (Microsoft Windows)": "PC",
        "PlayStation 5": "PS5",
        "PlayStation 4": "PS4",
        "Xbox Series X|S": "Xbox Series",
        "Xbox One": "Xbox One",
        "Nintendo Switch": "Switch"
    };    
    const buutonNext = () => {
        if(slide < background.length - 1){
            setSlide(slide + 1);
        }
    };
    const buutonPrev = () => {
        if(slide > 0){
            setSlide(slide - 1);
        }
    };
    return (
        <>
            {background.map((game, index) => 
                index === slide && (
                <div key={game.id} className={`w-full h-[894px] max-desktop:h-[696px] max-md:h-[486px] bg-no-repeat bg-auto max-desktop:bg-cover bg-top ${index === 0 ? 'max-md:bg-[80%_center]' : 'max-md:bg-center'} items-center relative after:content-[''] after:absolute after:w-full after:h-full  after:bg-[linear-gradient(to_left,rgba(28,27,41,0),rgba(28,27,41,1)_73.5%),linear-gradient(to_top,rgba(28,27,41,1),rgba(28,27,41,0)_50%)] max-md:after:bg-[linear-gradient(to_left,rgba(28,27,41,0),rgba(28,27,41,1)_95%),linear-gradient(to_top,rgba(28,27,41,1),rgba(28,27,41,0)_25%)] ${index === slide ? 'flex' : 'hidden'} `} style={{backgroundImage: `url('${game.screenshots[1]}')`}}>
                    <div className="flex gap-9 max-desktop:gap-5 w-full h-[654px] max-desktop:h-[500px] max-lg:h-full items-end max-lg:items-center z-10 relative max-lg:flex-col max-lg:justify-end container"> 
                        <div className=" w-full flex flex-col max-lg:items-center gap-8 max-lg:gap-0 max-md:mb-24px">
                            <div className="text-white max-lg:max-w-[382px] max-lg:text-center max-lg:px-[10px] max-lg:items-center">
                                <h1 className="font-extrabold text-[40px] max-desktop:text-[32px] pb-2">{game.name}</h1>
                                <p className="max-desktop:text-sm max-lg:hidden line-clamp-5">{game.description}</p>
                            </div>
                            <div className="flex flex-col gap-7 max-lg:gap-4 max-lg:w-full max-lg:p-2 max-lg:py-4">
                                <div className="flex w-full justify-between max-lg:justify-around">
                                    <div className="flex items-center">
                                        <img src={matacritic} alt="Metacritic Score" className="max-lg:h-6 max-lg:w-6" />
                                        <span className="text-[#FFCC00] text-2xl font-bold pl-3">{game.metaScore}</span>  
                                        <span className="text-[#979797]">/100</span>
                                    </div>
                                    <div className="flex items-center text-white gap-3">
                                        <img src={date} alt="Release Date" />
                                        <span>{new Date(game.date).toLocaleDateString("en-US", {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between max-lg:hidden">
                                    <div className="flex flex-col text-center w-1/2">
                                        <span className="text-white text-xl font-semibold">Available For:</span>
                                        <ul className="flex gap-1 justify-center items-center text-[#979797]">
                                            {game.platforms.slice(0, 3).map((platform, index) => (
                                                <li key={index} className="after:content-['-'] last:after:content-none after:ml-2">
                                                    {platformShortNames[platform as keyof typeof platformShortNames] || platform}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="w-1/2 flex flex-col text-center">
                                        <span className="text-white text-xl font-semibold">Genre:</span>
                                        <span className="text-[#979797]">{game.genres[0]}</span>
                                    </div>
                                </div>
                                {/* */}
                                <div className="flex gap-2 text-[#979797] w-full max-lg:hidden">
                                    {game.platforms.slice(0,3).map((platform, index) => (
                                        <button className="px-1 w-full rounded-[10px] border border-solid border-[#979797]" key={index}>
                                            {platformShortNames[platform as keyof typeof platformShortNames] || platform}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-full flex justify-between gap-3 h-[44px]">
                                    <button className="opaqueButton rounded-[20px] w-full h-full">Buy Now</button>
                                    <button className="transparentButton rounded-[20px] w-full h-full">Game review</button>
                                </div>
                            </div>
                            <div  className="hidden max-w-[161px] w-full h-[10px] max-lg:flex max-lg:justify-between max-lg:items-center">
                                {background.map((_, index) => 
                                    <div key={index} className={`w-[25px] h-1/2 bg-[#8C301C] rounded-[2px] ${slide === index ? 'w-[45px] bg-[#FF5733] h-full': ''}`}></div>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-5">
                            <div className="flex items-center justify-between max-lg:w-full max-lg:top-[33%] max-lg:left-0 max-lg:absolute max-lg:py-[15px] z-40">
                                <div className="text-white text-xl font-semibold max-lg:hidden">
                                    <p>The Most <span className="text-[#FF5733]">Popular</span> Games</p>
                                </div>
                                <div className="flex gap-[10px] max-lg:w-full justify-between max-lg:px-6">
                                    <button className="buttonSwitch p-[16.5px]" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buutonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                                    <button className={`buttonSwitch p-[16.5px]  ${slide < background.length - 1 ? 'cursor-pointer' : 'cursor-auto'} `} style={{border: slide < background.length - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buutonNext}><GrLinkNext style={{color: slide < background.length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                                </div>
                            </div>
                            <div className="flex w-full max-w-full justify-between items-end gap-4 max-lg:hidden ">
                                {background.map((game, index) => (
                                    <div key={game.id} className={`w-[154px] overflow-hidden rounded-4xl ${slide === index ? 'h-[240px] max-desktop:h-[179px]' : 'h-[220px]'}`} style={{border: slide === index ? '1px solid #FF5733' : 'none', borderRadius: 4,position: 'relative'}}>
                                        <img src={game.poster}  alt="Game Banner" className="w-full h-full и object-cover" />
                                        {slide === index && (
                                            <div className="text-sm" style={{ display: 'flex', alignItems: 'end', padding: '0 0 16px 8px', color: '#FFFFFF', position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', borderRadius: '4px', background: 'linear-gradient(to top, #000000, rgba(0, 0, 0, 0) 40%)' }}>{game.name}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                )
            )}
        </>
    )
}
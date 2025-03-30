import React, { useState } from "react";
import date from '../../assets/Hero/date.png'
import matacritic from '../../assets/Hero/metacritic.png';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export const Hero = ({dataGames}) => {
    const [slide, setSlide] = useState(0);
    const background = dataGames?.games?.edges?.filter(edge => edge?.node?.BackgroundTop?.url);
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
            {background.map((edge, index) => 
                index === slide && (
                <div key={edge.node.objectId} className={`w-full h-[894px] max-desktop:h-[696px] max-md:h-[486px] bg-no-repeat bg-auto max-desktop:bg-cover bg-top ${index === 0 ? 'max-md:bg-[80%_center]' : 'max-md:bg-center'} items-center relative after:content-[''] after:absolute after:w-full after:h-full  after:bg-[linear-gradient(to_left,rgba(28,27,41,0),rgba(28,27,41,1)_73.5%),linear-gradient(to_top,rgba(28,27,41,1),rgba(28,27,41,0)_50%)] max-md:after:bg-[linear-gradient(to_left,rgba(28,27,41,0),rgba(28,27,41,1)_95%),linear-gradient(to_top,rgba(28,27,41,1),rgba(28,27,41,0)_25%)] ${index === slide ? 'flex' : 'hidden'} `} style={{backgroundImage: `url('${edge.node.BackgroundTop.url}')`}}>
                    <div className="flex gap-9 max-desktop:gap-5 w-full h-[654px] max-desktop:h-[500px] max-lg:h-full items-end max-lg:items-center z-10 relative max-lg:flex-col max-lg:justify-end container"> 
                        <div className="max-w-[333px] max-desktop:max-w-[323px] w-full flex flex-col max-lg:items-center gap-8 max-lg:gap-0 max-md:mb-24px">
                            <div className="text-white max-lg:max-w-[382px] max-lg:text-center max-lg:px-[10px] max-lg:items-center">
                                <h1 className="font-extrabold text-[40px] max-desktop:text-[32px] pb-2">{edge.node.name}</h1>
                                <p className="max-desktop:text-sm max-lg:hidden">{edge.node.description}</p>
                            </div>
                            <div className="flex flex-col gap-7 max-lg:gap-4 max-lg:w-full max-lg:p-2 max-lg:py-4">
                                <div className="flex w-full justify-between max-lg:justify-around">
                                    <div className="flex items-center">
                                        <img src={matacritic} alt="Metacritic Score" className="max-lg:h-6 max-lg:w-6" />
                                        <span className="text-[#FFCC00] text-2xl font-bold pl-3">{edge.node.metacriticScore}</span>  
                                        <span className="text-[#979797]">/{edge.node.metacriticScoreMax}</span>
                                    </div>
                                    <div className="flex items-center text-white gap-3">
                                        <img src={date} alt="Release Date" />
                                        <span>{new Date(edge.node.date).toLocaleDateString("en-US", {
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
                                            {edge.node.platform.map((platform, index) => (
                                                <li key={index}>{platform.value}{index < edge.node.platform.length - 1 ? ' - ' : ''}</li>                                            
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="w-1/2 flex flex-col text-center">
                                        <span className="text-white text-xl font-semibold">Genre:</span>
                                        <span className="text-[#979797]">{edge.node.genre[0]?.value}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-[#979797] w-full max-lg:hidden">
                                    {edge.node.platform.map((platform, index) => (
                                        <button className="px-1 w-full rounded-[10px] border border-solid border-[#979797]" key={index}>{platform.value}</button>
                                    ))}
                                </div>
                                <div className="w-full flex justify-between gap-3 h-[44px]">
                                    <button className="opaqueButton rounded-[20px] w-[144px] max-desktop:w-[155px] max-lg:w-[185px] h-full">Buy Now</button>
                                    <button className="transparentButton rounded-[20px] w-[177px]  max-desktop:w-[155px] max-lg:w-[185px] h-full">Game review</button>
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
                            <div className="flex justify-between items-end max-desktop:gap-2 max-lg:hidden">
                                {background.map((edge, index) => (
                                    <div key={edge.node.objectId} className={`h-[220px] max-desktop:h-[164px] ${slide === index ? 'h-[240px] max-desktop:h-[179px]' : ''}`} style={{border: slide === index ? '1px solid #FF5733' : 'none', borderRadius: 4,position: 'relative'}}>
                                        <img src={edge.node.BannerImg.url}  alt="Game Banner" className="h-full max-desktop:object-cover" />
                                        {slide === index && (
                                            <div className="text-sm" style={{ display: 'flex', alignItems: 'end', padding: '0 0 16px 8px', color: '#FFFFFF', position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', borderRadius: '4px', background: 'linear-gradient(to top, #000000, rgba(0, 0, 0, 0) 40%)' }}>{edge?.node.name}</div>
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
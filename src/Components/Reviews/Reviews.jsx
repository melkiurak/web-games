import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCalendarMonth, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { RiStarSLine } from "react-icons/ri";
import metacritic from '../../assets/main/metacritic.png'

export const Reviews = ({dataGames}) => {
    const [slide, setSlide] = useState(0);
    const gamesReviews = dataGames?.games?.edges.filter(edge=> edge?.node?.Reviews && Object.keys(edge.node.Reviews).length > 0);
    const groupGamesReviewsSlides = (games = []) => {
        const gamesSlideGroups = [];
        for(let i = 0; i < games.length; i +=4){
            const gamesSlideItems = games.slice(i, i + 4);
            gamesSlideGroups.push(gamesSlideItems);
        } 
        return gamesSlideGroups;
    }
    const buutonNext = () => {
        if(slide < groupGamesReviewsSlides(gamesReviews).length - 1){ 
            setSlide(slide + 1);
        }
    };
    const buutonPrev = () => {
        if(slide > 0){
            setSlide(slide - 1);
        }
    };
    return <div>
        <div className="container flex flex-col gap-8 max-lg:px-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <h2>Game Reviews</h2>
                    <button className="flex items-center gap-1 text-[#FF5733]">
                        <span className="text-lg font-medium">View All</span>
                        <IoIosArrowForward className="text-2xl"/>
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 max-md:hidden">
                        <button className="buttonSwitch py-1.5 px-3" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buutonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                        <button className={`buttonSwitch py-1.5 px-3  ${slide < groupGamesReviewsSlides(gamesReviews).length - 1 ? 'cursor-pointer' : 'cursor-auto'} `} style={{border: slide < groupGamesReviewsSlides(gamesReviews).length  - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buutonNext}><GrLinkNext style={{color: slide < groupGamesReviewsSlides(gamesReviews).length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                    </div>
                    <div className=" w-full h-[12px] flex gap-4 items-center max-md:hidden">
                        {groupGamesReviewsSlides(gamesReviews).map((_, index) => 
                            <div key={index} className={`w-[17px] h-[7px] bg-[#452154] rounded-3xl ${slide === index ? 'w-[28px] bg-[#FF5733] h-full' : ''}`}></div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid max-md:flex grid-cols-2 max-desktop:grid-cols-1 gap-6 max-desktop:gap-3 max-md:whitespace-nowrap max-md:overflow-x-auto">  
                {groupGamesReviewsSlides(gamesReviews)[slide]?.map((edge) => (
                    <div key={edge.node.objectId} className="border-[#7D3C98] border rounded-lg">
                        <div className="flex gap-3 p-2 h-[210px] max-md:h-full max-desktop:h-[180px] max-md:flex-col max-md:w-[294px]">
                            <div className="w-[140px] max-md:w-full h-full max-md:h-[194px] bg-center max-md:bg-[center_top_-3rem] max-phone:!bg-center bg-cover bg-no-repeat rounded-lg" style={{backgroundImage: `url('${edge.node.BannerImg.url}')`}}></div>
                            <div className="flex-1 w-[306px] max-md:w-full h-full flex flex-col gap-2">
                                <div className="flex items-center font-medium text-base border-b-1 border-white">
                                    <h4 className="text-white">
                                        {edge.node.name} 
                                        <span className="text-[#979797]">({new Date(edge.node.date).getFullYear()})</span>
                                    </h4>
                                </div>
                                <div className="w-full flex-1">
                                    <p className="overflow-hidden text-ellipsis line-clamp-6 text-[#979797] text-xs font-light max-md:whitespace-normal">{edge.node.description}</p> 
                                </div>
                                <div className="flex items-center gap-1 max-md:justify-center">
                                    {edge.node.genre.map((genre, index) => (
                                        <span key={index} className="bg-[#181724] rounded-4xl px-4 py-1 text-[10px] text-white font-light">{genre.value}</span>    
                                    ))}
                                </div>
                                <div className="flex justify-between max-md:justify-around">
                                    <div className="flex items-center">
                                        <img src={metacritic} alt="" />
                                        <span className="text-[#FFCC00] text-base font-medium pl-2">{edge.node.metacriticScore}</span>  
                                        <span className="text-[#979797] text-sm">/{edge.node.metacriticScoreMax}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MdOutlineCalendarMonth  className="text-xl text-white"/>
                                        <span className="text-xs font-light text-white">{new Date(edge.node.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        day: 'numeric',
                                        month:'long',
                                        })}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between w-[102px] max-desktop:w-[148px] max-md:w-full max-md:gap-2">
                                <div className=" flex flex-col max-md:flex-row  max-md:justify-between gap-[10px] max-desktop:gap-0 ">
                                    <div className="flex flex-col items-center gap-1">
                                        <MdOutlineRemoveRedEye className="text-white text-xl"/>
                                        <span className="text-white text-sm font-normal">100+<span className="text-[#979797] text-xs font-light pl-1">Views</span></span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <FaRegComment className="text-white text-xl"/>
                                        <span className="text-white text-sm font-normal">3<span className="text-[#979797] text-xs font-light pl-1">Comments</span></span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <RiStarSLine className="text-white text-xl"/>
                                        <span className="text-white text-sm font-normal">8.7<span className="text-[#979797] text-xs font-light pl-1">/10</span></span>
                                    </div>
                                </div>
                                <button className="opaqueButton w-full py-[7px] rounded-xl text-sm font-light">Full Review</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}
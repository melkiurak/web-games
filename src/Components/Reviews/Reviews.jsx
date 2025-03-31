import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";

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
        <div className="container flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <h2>Game Reviews</h2>
                    <button className="flex items-center gap-1 text-[#FF5733]">
                        <span className="text-lg font-medium">View All</span>
                        <IoIosArrowForward className="text-2xl"/>
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <button className="buttonSwitch py-1.5 px-3" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buutonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                        <button className={`buttonSwitch py-1.5 px-3  ${slide < groupGamesReviewsSlides(gamesReviews).length - 1 ? 'cursor-pointer' : 'cursor-auto'} `} style={{border: slide < groupGamesReviewsSlides(gamesReviews).length  - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buutonNext}><GrLinkNext style={{color: slide < groupGamesReviewsSlides(gamesReviews).length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                    </div>
                    <div className=" w-full h-[12px] flex gap-4 items-center">
                        {groupGamesReviewsSlides(gamesReviews).map((_, index) => 
                            <div key={index} className={`w-[17px] h-[7px] bg-[#452154] rounded-3xl ${slide === index ? 'w-[28px] bg-[#FF5733] h-full' : ''}`}></div>
                        )}
                    </div>
                </div>
            </div>
            {groupGamesReviewsSlides(gamesReviews)[slide]?.map((edge) => (
                <div key={edge.node.objectId}>
                    <h1>{edge.node.name}</h1>
                </div>
            ))}
        </div>
    </div>
}
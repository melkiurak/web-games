import { useEffect, useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"
import { IoIosArrowForward } from "react-icons/io"
import { MdOutlineCalendarMonth } from "react-icons/md";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { GameCard } from "../ui/GameCard/GameCard";
import { MOCK_GAME_CARDS } from "@/mocks/game";
import { data } from "react-router";
import { GameCardPreview } from "@/types";
import { getGames } from "@/Service/gamedata";

export const Upcoming = ({/*dataUpcomingGames*/}) => {
    const [upcoming, setUpcoming] = useState<GameCardPreview[]>([]);
    /*const [slide, setSlide] = useState(0);
    const upcomingData = dataUpcomingGames.upcomingGames.edges.map(edge => edge?.node);
    const groupUpcomingGames = (upcomingGames = []) => {
        const upcomingSlideGroup = [];
        for(let i = 0; i < upcomingGames.length; i+=5){
            const upcomingSlideItems = upcomingGames.slice(i, i + 5);
            upcomingSlideGroup.push(upcomingSlideItems);
        }
        return upcomingSlideGroup;
    }
    const buttonNext = () => {
        if (slide < groupUpcomingGames(upcomingData).length - 1) {
            setSlide(slide + 1);
        }
    }
    const buttonPrev = () => {
        if (slide > 0) {
            setSlide(slide - 1);
        }
    }
    const moth = () => {
        return dataUpcomingGames.upcomingGames.edges.map(edge => {
            const dateMoth = new Date(edge?.node.date).getMonth();
            if( dateMoth <= 3){
                return 'Early'
            } else if(dateMoth <= 7){
                return 'Mid'
            } else if(dateMoth <= 11){
                return 'End'
            }
        });
    };*/
    useEffect(() => {
        const loadGames = async() => {
            const data = await getGames({upcoming: 'true', take: 20})
            setUpcoming(data)
        }
        loadGames()
    }, [])
    return <div className="max-lg:pl-6">
        <div className="container flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <h2>Game Reviews</h2>
                    <button className="flex items-center gap-1 text-[#FF5733]">
                        <span className="text-lg font-medium">View All</span>
                        <IoIosArrowForward className="text-2xl"/>
                    </button>
                </div>
                <div >
                    {upcoming.map((g) => (
                        <GameCard key={g.id} game={g} />
                    ))}
                </div>
                {/*<div className="flex flex-col gap-2 max-lg:hidden">
                    <div className="flex gap-2">
                        <button className="buttonSwitch py-1.5 px-3" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                        <button className={`buttonSwitch py-1.5 px-3  ${slide < upcomingData.length - 1 ? 'cursor-pointer' : 'cursor-auto'} `} style={{border: slide < upcomingData.length  - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext}><GrLinkNext style={{color: slide < upcomingData.length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                    </div>
                    <div className=" w-full h-[12px] flex gap-4 items-center">
                        {groupUpcomingGames(dataUpcomingGames.upcomingGames.edges).map((_, index) => 
                            <div key={index} className={`w-[17px] h-[7px] bg-[#452154] rounded-3xl ${slide === index ? 'w-[28px] bg-[#FF5733] h-full' : ''}`}></div>
                        )}
                    </div>
                </div>*/}
            </div>
            {/*{MOCK_GAME_CARDS.map((item) => (
                <GameCard key={item.id} game={item} />
            ))}*/}
        </div>
    </div>
}
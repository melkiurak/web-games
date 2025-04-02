import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"
import { IoIosArrowForward } from "react-icons/io"
import { MdOutlineCalendarMonth } from "react-icons/md";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

export const Upcoming = ({dataUpcomingGames}) => {
    const [slide, setSlide] = useState(0);
    const upcomingData = dataUpcomingGames.upcomingGames.edges.map(edge => edge?.node);
    const buttonNext = () => {
        if (slide < upcomingData.length - 1) {
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
    };
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
                <div className="flex flex-col gap-2 max-lg:hidden">
                    <div className="flex gap-2">
                        <button className="buttonSwitch py-1.5 px-3" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                        <button className={`buttonSwitch py-1.5 px-3  ${slide < upcomingData.length - 1 ? 'cursor-pointer' : 'cursor-auto'} `} style={{border: slide < upcomingData.length  - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext}><GrLinkNext style={{color: slide < upcomingData.length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                    </div>
                    <div className=" w-full h-[12px] flex gap-4 items-center">
                        {dataUpcomingGames.upcomingGames.edges.map((_, index) => 
                            <div key={index} className={`w-[17px] h-[7px] bg-[#452154] rounded-3xl ${slide === index ? 'w-[28px] bg-[#FF5733] h-full' : ''}`}></div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between max-lg:gap-4 max-lg:whitespace-nowrap max-lg:overflow-x-auto">
                {dataUpcomingGames.upcomingGames.edges.map((edge, index) => (
                    <div key={edge.node.name} className="border-[#7D3C98] border rounded-2xl">
                        <div className="p-[10px] max-desktop:p-2 w-[227.2px] max-desktop:w-[167.2px] flex flex-col gap-2">
                            <div className="bg-center bg-cover bg-no-repeat w-full h-[286px] max-desktop:h-[172px] max-lg:h-[181px] rounded-2xl" style={{backgroundImage: `url('${edge.node.bannerGame.url}')`}}></div>
                            <div className="flex flex-col gap-2 max-lg:gap-3 max-lg:text-center">
                                <h4 className="text-white text-base font-medium">{edge.node.name}</h4>
                                <div className="flex justify-between items-center max-lg:flex-col max-lg:gap-3">
                                    <div className="flex items-center gap-1">
                                        <MdOutlineCalendarMonth className="text-white text-base max-lg:text-xl"/>
                                        <span className="text-[#979797] text-xs">{moth()[index]} {new Date(edge.node.date).getFullYear()}</span>
                                    </div>
                                    <button className="flex items-center gap-1">
                                        <span className="text-white text-xs">Pre-Order</span>
                                        <HiOutlineArrowLongRight className="text-[#FF5733] text-lg"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}
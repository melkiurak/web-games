import { useState } from "react"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io"

export const GamesNews = ({dataNewsGames}) => {
    const [slide, setSlide] = useState(0);
    const groupNews = (news = []) => {
        const newsSliderGroups = [];
        for(let i = 0; i < news.length; i+=5){
            newsSliderGroups.push(news.slice(i, i + 5));
        };
        return newsSliderGroups;
    }
    const buutonNext = () => {
        if(slide < dataNewsGames.length - 1){ 
            setSlide(slide + 1);
        }
    };
    const buutonPrev = () => {
        if(slide > 0){
            setSlide(slide - 1);
        }
    };
    return <div>
        <div className="container flex flex-col gap-6">
            <div className="flex justify-between w-full">
                <div className="flex gap-12 items-center">
                    <h2>Blog Post</h2>
                    <button className="flex items-center gap-1 text-[#FF5733]">
                        <span className="font-medium whitespace-nowrap">View All</span>
                        <IoIosArrowForward className="text-2xl" />
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 max-md:hidden">
                        <button className="buttonSwitch py-1.5 px-3" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buutonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                        <button className={`buttonSwitch py-1.5 px-3  ${slide < dataNewsGames.length - 1 ? 'cursor-pointer' : 'cursor-auto'} `} style={{border: slide < dataNewsGames.length  - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buutonNext}><GrLinkNext style={{color: slide < dataNewsGames.length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                    </div>
                    <div className=" w-full h-[12px] flex gap-4 items-center max-md:hidden">
                        
                    </div>
                </div>
            </div>
            <div className="h-[380px] flex gap-3">
                <div className="h-full bg-center bg-cover bg-no-repeat rounded-[10px] flex-1 flex items-end pl-3 relative" style={{backgroundImage: `url('${groupNews(dataNewsGames?.news?.edges)[slide][0]?.node?.Background?.url}')`}}>
                    <h3 className="z-30">{groupNews(dataNewsGames?.news?.edges)[slide][0]?.node?.Title}</h3>
                    <div className="absolute inset-0 bg-black/30 rounded-[10px]"></div>
                </div>
                <div  className="grid grid-cols-2 h-full flex-1 gap-3">
                    {groupNews(dataNewsGames?.news?.edges)[slide].slice(1).map((edge, index) => 
                        <div key={edge.node.objectId} className=" bg-center bg-cover bg-no-repeat rounded-[10px] pl-3 flex items-end relative" style={{backgroundImage: `url('${edge?.node?.Background?.url}')`}}>
                            <h4 className="text-white z-10">{edge.node.Title}</h4>
                            <div className="absolute inset-0 bg-black/30 rounded-[10px]"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
}
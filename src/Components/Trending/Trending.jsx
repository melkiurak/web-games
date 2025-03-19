import { MdOutlineKeyboardArrowRight, MdOutlineCalendarMonth } from "react-icons/md";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import metacritic from '../../assets/main/metacritic.png'
import { useCallback, useEffect, useState } from "react";
export const Trending = ({dataGames, dataDiscounts}) => {
    const [slide, setSlide] = useState(0);
    const [discountsPrice, setDiscountsPrice] = useState(null);

    const groupGamesIntoSlides = (games = []) => {
        const gameSlideGroups = [];
        for (let i = 0; i < games.length; i += 5) {
            const gameSlideItems = games.slice(i, i + 5);
            gameSlideGroups.push(gameSlideItems);
        }
        return gameSlideGroups;
    };

    const buttonNext = () => {
        if (slide < groupGamesIntoSlides(dataGames?.games?.edges).length - 1) {
            setSlide(slide + 1);
        }
    }

    const buttonPrev = () => {
        if (slide > 0) {
            setSlide(slide - 1);
        }
    }

    const discount = useCallback((currentSlideGames) => {
        if (!currentSlideGames || !dataDiscounts?.discounts?.edges?.length) {
            return [];
        }
        const discountValues = dataGames?.games?.edges.map(edge => edge.node.discount);
        const finalPrices = currentSlideGames.map((edge, index) => {
            const price = edge.node.price;
    
            const discountedPrice = price * (1 - discountValues[index] / 100); 
            return Math.round(discountedPrice);
        });
    
        console.log("Final Prices:", finalPrices);
        return finalPrices;
    }, [dataDiscounts, dataGames]);

    const dataChek = useCallback(() => {
        for (let i = 0; i < dataDiscounts?.discounts?.edges?.length; i++) {
            const discountData = dataDiscounts?.discounts?.edges[i]?.node;
            const date = new Date().toISOString();
            if (discountData?.startDate && discountData?.endDate && discountData?.startDate <= date && date <= discountData?.endDate) {
                setDiscountsPrice(discount(groupGamesIntoSlides(dataGames?.games?.edges)[slide]));
                return true;
            } else {
                setDiscountsPrice(null);
                return false;
            }
        }
    }, [dataDiscounts, discount, dataGames, slide]);

    useEffect(() => {
        dataChek();
    }, [dataChek, slide]);
    return <div className="h-[453px] max-desktop:h-[405px] max-lg:h-[357px] max-lg:ml-6">
            <div className="flex flex-col justify-between h-full container">
                <div className="flex w-full justify-between h-[51px]">
                    <div className="w-full flex justify-between items-center gap-12">
                        <h2 className="text-nowrap">Trending Games</h2>
                        <div className="flex items-center justify-center h-full w-[166px] max-lg:w-[102px]">
                            <span className="text-[#FF5733] text-sm font-light">View All</span>
                            <MdOutlineKeyboardArrowRight className="text-[#FF5733] text-3xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 max-lg:hidden ">
                        <div className="flex gap-2">
                        <button className="rounded-[8px] px-3 py-[6px] max-lg:p-3 border border-solid border-[#979797]" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                            <button className={`rounded-[8px] px-3 py-[6px] max-lg:p-3 border border-solid border-[#979797] ${slide < groupGamesIntoSlides(dataGames?.games?.edges).length - 1 ? 'cursor-pointer' : 'cursor-auto'}`} style={{border: slide < groupGamesIntoSlides(dataGames?.games.edges).length - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext} ><GrLinkNext style={{color: slide < dataGames?.games.edges.length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                        </div>
                        <div className=" max-w-[96px] w-full h-[12px] flex justify-between items-center">
                            {groupGamesIntoSlides(dataGames?.games?.edges).map((_, index) => 
                                <div key={index} className={`w-[7px] h-[7px] bg-[#452154] rounded-3xl ${slide === index ? 'w-[28px] bg-[#FF5733] h-full' : ''}`}></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between max-lg:gap-[16px] max-lg:whitespace-nowrap max-md::whitespace-nowrap max-lg:overflow-x-auto overflow-hidden ">
                    {groupGamesIntoSlides(dataGames?.games?.edges)[slide]?.map((edge, index) => (
                        <div key={edge.node.objectId} className="flex flex-col gap-3 border-1 border-solid border-[#7D3C98] p-[10px] max-desktop:p-2 rounded-xl" >
                            <div className="w-[207.2px] max-desktop:w-[151.2px] h-[239px] max-desktop:h-[184px] max-lg:h-[178px] bg-center bg-cover bg-no-repeat rounded-xl" style={{backgroundImage: `url('${edge.node.BannerImg.url}')`}}>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-white font-medium">{edge.node.name}</p>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                        <MdOutlineCalendarMonth className="text-white text-xl"/>
                                        <span className="text-[#979797] text-xs font-light">{new Date(edge.node.date).toLocaleDateString("en-US", {
                                            year: 'numeric',
                                        })}</span>
                                    </div>
                                    <div className="max-w-[97.6px] max-desktop:max-w-[75.6px] w-full h-full flex gap-1 items-center ">
                                        <img className="w-5 h-5" src={metacritic} alt="" />
                                        <span className="text-[#FFCC00] text-base font-medium">{edge.node.metacriticScore}</span>  
                                        <span className="text-[#979797] text-sm">/{edge.node.metacriticScoreMax}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between max-desktop:flex-col max-desktop:items-center max-desktop:gap-2">
                                    <div className="w-[85px] flex justify-between items-center">
                                        <span className={`${discountsPrice ? 'line-through text-[#979797] text-xs font-light' : 'text-white font-main '}`}>{Math.round(edge.node.price)}$</span>
                                        <span className="text-white font-main">{discountsPrice ? `${discountsPrice[index]}$` : ''}</span>
                                        <span className={`${discountsPrice ? 'bg-[#FF5733] rounded-[12px] px-1 text-[10px] font-light text-white' : 'hidden'}`}>{edge.node.discount}%</span>                                    
                                    </div>
                                    <button className="flex items-center gap-1 max-lg:hidden">
                                        <span className="text-xs font-main text-white">Buy now</span>
                                        <BsArrowRight className="text-[#FF5733] text-lg"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) 
                    }
                </div>
            </div>
        </div>
}
import { useCallback, useEffect, useState } from "react";
import { Filters } from "./Filters/Filters";
import metacritic from '../../assets/main/metacritic.png'
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

export const GameFilter = ({dataGames, dataDiscounts}) => {
    const [resultSearch, setResultSearch] = useState([]);
    const [gamesCount, setGamesCount] = useState(10);
    const [discountsPrice, setDiscountsPrice] = useState(null);
    const handleGameCount = () => {
        if (window.innerWidth <= 541) {
            setGamesCount(4); 
        }else if (window.innerWidth <= 767) {
            setGamesCount(6); 
        }
         else if (window.innerWidth <= 1023) {
            setGamesCount(8);
        } else {
            setGamesCount(10); 
        }
    };
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
                setDiscountsPrice(discount((dataGames?.games?.edges)));
                return true;
            } else {
                setDiscountsPrice(null);
                return false;
            }
        }
    }, [dataDiscounts, discount, dataGames,]);

    useEffect(() => {
        dataChek();
    }, [dataChek]);
    useEffect(() => {
        handleGameCount();
    
        const handleResize = () => {
            handleGameCount();
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return <div className="max-lg:px-5 max-md:px-3">
        <div className="container flex flex-col gap-8">
            <div className="flex flex-col text-center">
                <h2 className="text-white">Games By Filter</h2>
                <p className="text-[#979797]">At This Section You Can Search For Games by multiple filters</p>
            </div>
            <Filters dataGames={dataGames} setResultSearch={setResultSearch}/>
            <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-small-screen:!grid-cols-2 justify-items-center gap-y-10 max-desktop:gap-y-5 max-lg:gap-y-5 gap-x-4 max-desktop:gap-x-3 max-lg:gap-x-4">
                {((resultSearch?.length > 0 ? resultSearch : dataGames?.games?.edges || []).slice(0, gamesCount).map((game, index) => 
                    <div key={game.objectId || game.node?.objectId} className="w-full p-[10px] max-desktop:p-2 border border-[#7D3C98] rounded-lg flex flex-col gap-3">
                        <div className="w-full h-[239px] max-desktop:h-[178px] max-lg:h-[200px] max-md:h-[250px] max-small-screen:!h-[200px] bg-center  bg-cover bg-no-repeat rounded-lg" style={{backgroundImage: `url('${game.BannerImg?.url || game.node?.BannerImg?.url}')`}}></div>
                        <div className="flex flex-col gap-3 ">
                            <p className="text-white font-medium truncate">{game.name || game.node?.name}</p>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-1">
                                    <MdOutlineCalendarMonth className="text-white text-xl max-md:text-base"/>
                                    <span className="text-[#979797] text-xs max-md:text-[10xp] font-light">{new Date(game.date || game.node?.date).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                    })}</span>
                                </div>
                                <div className="max-w-[97.6px] max-desktop:max-w-[75.6px] w-full h-full flex gap-1 items-center ">
                                    <img className="w-5 max-md:w-4 h-5 max-md:h-4" src={metacritic} alt="" />
                                    <span className="text-[#FFCC00] text-base max-md:text-xs font-medium">{game.metacriticScore || game.node?.metacriticScore}</span>  
                                    <span className="text-[#979797] text-sm max-md:text-[10px]">/{game.metacriticScoreMax || game.node?.metacriticScoreMax}</span>
                                </div>
                            </div>
                            <div className="flex justify-between max-desktop:flex-col max-desktop:items-center max-desktop:gap-2">
                                <div className="w-[85px] flex justify-between items-center">
                                    <span className={`${discountsPrice ? 'line-through text-[#979797] text-xs font-light' : 'text-white font-main '}`}>{Math.round(game.price || game.node?.price)}$</span>
                                    <span className="text-white font-main">{discountsPrice ? `${discountsPrice[index]}$` : ''}</span>
                                    <span className={`${discountsPrice ? 'bg-[#FF5733] rounded-[12px] px-1 text-[10px] font-light text-white' : 'hidden'}`}>{game.discount || game.node?.discount}%</span>                                    
                                </div>
                                <button className="flex items-center gap-1 max-lg:hidden">
                                    <span className="text-xs font-main text-white">Buy now</span>
                                    <BsArrowRight className="text-[#FF5733] text-lg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}
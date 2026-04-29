import { useGetData } from "@/hooks/useGetData"
import { BsArrowRight } from "react-icons/bs"
import { MdOutlineCalendarMonth } from "react-icons/md"
import matacritic from '../../assets/Hero/metacritic.png';
import { useEffect, useState } from "react";
import { getFilteredGames } from "@/Service/game.service";
import { Filters } from "./Filters/Filters";
import { GameCardPreview, Genre } from "@/types";

export const GameFilterTwo = () => {
    const [games, setGames] = useState<GameCardPreview[]>([])
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    const {data, error, loading} = useGetData('trending', 10)
    
    const filteredGames = async() => {
        try{
            const genres = selectedGenres.map((g:Genre) => g.name)
            const filter = await getFilteredGames({genres})
            setGames(filter)
        } catch(error) {
            console.log('Error of filteres', error)
        }
    }
    useEffect(() => {
        filteredGames();
    }, [selectedGenres]);

    return <div className="max-lg:px-5 max-md:px-3">
        <div className="container flex flex-col gap-8">
            <div className="flex flex-col text-center">
                <h2 className="text-white">Games By Filter</h2>
                <p className="text-[#979797]">At This Section You Can Search For Games by multiple filters</p>
            </div>
            <Filters selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
            <div className="items-start grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-small-screen:!grid-cols-2 justify-items-center gap-y-10 max-desktop:gap-y-5 max-lg:gap-y-5 gap-x-4 max-desktop:gap-x-3 max-lg:gap-x-4">
                {games.map((game, index) => (
                     <div key={game.id} className="w-full p-[10px] max-desktop:p-2 border border-[#7D3C98] rounded-lg flex flex-col gap-3">
                        <div className="w-full h-[239px] max-desktop:h-[178px] max-lg:h-[200px] max-md:h-[250px] max-small-screen:!h-[200px] bg-center  bg-cover bg-no-repeat rounded-lg" style={{backgroundImage: `url('${game.poster}')`}}></div>
                        <div className="flex flex-col gap-3 ">
                            <p className="text-white font-medium truncate">{game.name}</p>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-1">
                                    <MdOutlineCalendarMonth className="text-white text-xl max-md:text-base"/>
                                    <span className="text-[#979797] text-xs max-md:text-[10xp] font-light">{new Date(game.date).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                    })}</span>
                                </div>
                                <div className="max-w-[97.6px] max-desktop:max-w-[75.6px] w-full h-full flex gap-1 items-center ">
                                    <img className="w-5 max-md:w-4 h-5 max-md:h-4" src={matacritic} alt="" />
                                    <span className="text-[#FFCC00] text-base max-md:text-xs font-medium">{game.metaScore}</span>  
                                    <span className="text-[#979797] text-sm max-md:text-[10px]">/100</span>
                                </div>
                            </div>
                            <div className="flex justify-between max-desktop:flex-col max-desktop:items-center max-desktop:gap-2">
                                <div className="w-[85px] flex justify-between items-center">
                                {game.price > 0 ? (
                                    <>
                                    {/*
                                        <span className={`${discountsPrice ? 'line-through text-[#979797] text-xs font-light' : 'text-white font-main '}`}>{Math.round(game.price || game?.node?.price) + '$'}</span>
                                        <span className={`${discountsPrice ? 'bg-[#FF5733] rounded-[12px] px-1 text-[10px] font-light text-white' : 'hidden'}`}>{game?.discount || game?.node?.discount ? `${game.discount || game.node.discount}%` : ''}</span>
                                    */
                                    }
                                    
                                    <span className="text-white font-main">{Math.round(game.price) + '$'}</span>                                    
                                    </>
                                ) : (
                                    <span className="text-white font-main">Free</span>
                                )}
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
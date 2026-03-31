import { MOCK_GAME_CARDS } from "@/mocks/game"
import { MdOutlineCalendarMonth } from "react-icons/md"
import metacritic from '@/assets/metacr.png'
import { BsArrowRight } from "react-icons/bs"
import { GameCardPreview } from "@/types"

export const GameCard = ({game} : {game: GameCardPreview}) => {
    const validateGame = () => {
        if(game.name === 'string' && game.name.trim() !== '' && Array.isArray(game.genres) && game.genres.length > 0 ){
            return true;
        } 
        return false;
    }
    return <div className="flex justify-between max-lg:gap-[16px] max-lg:whitespace-nowrap max-md:whitespace-nowrap max-lg:overflow-x-auto overflow-hidden ">
        <div  className="flex flex-col gap-3 border-1 border-solid border-[#7D3C98] p-[10px] max-desktop:p-2 rounded-xl" >
            <div className="w-[207.2px] max-desktop:w-[151.2px] h-[239px] max-desktop:h-[184px] max-lg:h-[178px] bg-center bg-cover bg-no-repeat rounded-xl" style={{backgroundImage: `url('${game.cover_url}')`}}>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-white font-medium">{game.name}</p>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        <MdOutlineCalendarMonth className="text-white text-xl"/>
                        <span className="text-[#979797] text-xs font-light">{new Date(game.first_release_date).toLocaleDateString("en-US", {
                            year: 'numeric',
                        })}</span>
                    </div>
                    <div className="max-w-[97.6px] max-desktop:max-w-[75.6px] w-full h-full flex gap-1 items-center ">
                        <img className="w-5 h-5" src={metacritic} alt="" />
                        <span className="text-[#FFCC00] text-base font-medium">{game.rating}</span>  
                        <span className="text-[#979797] text-sm">/100</span>
                    </div>
                </div>
                <div className="flex justify-between max-desktop:flex-col max-desktop:items-center max-desktop:gap-2">
                    <div className="w-[85px] flex justify-between items-center">
                        <span className={`${/*discountsPrice ? 'line-through text-[#979797] text-xs font-light' :*/ 'text-white font-main '}`}>{Math.round(game.price)}$</span>
                        {/*<span className="text-white font-main">{discountsPrice ? `${discountsPrice[index]}$` : ''}</span>
                        <span className={`${discountsPrice ? 'bg-[#FF5733] rounded-[12px] px-1 text-[10px] font-light text-white' : 'hidden'}`}>{edge.node.discount}%</span>   */}                                
                    </div>
                    <button className="flex items-center gap-1 max-lg:hidden">
                        <span className="text-xs font-main text-white">Buy now</span>
                        <BsArrowRight className="text-[#FF5733] text-lg"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
}
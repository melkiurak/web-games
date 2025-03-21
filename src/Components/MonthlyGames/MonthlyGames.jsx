import { useEffect, useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import metacritic from '../../assets/main/metacritic.png'
import { RiRam2Line } from "react-icons/ri";
import { BsGpuCard } from "react-icons/bs";
import { FiCpu } from "react-icons/fi";

export const MonthlyGames = ({dataGames}) => {
    const [gamesMonthly, setGamesMonthly] = useState([]);
    const [gameShowcase, setGameShowcase] = useState(null);
    const [activeTrailerUrl, setActiveTrailerUrl] = useState(null);

    const nowDate = new Date().toLocaleDateString("en-US", {year: 'numeric',month: 'numeric',}).split('/').map(Number) 
    
    const monthlyGames = dataGames?.games?.edges.filter((edge) => {
        if (edge.node.gameOfTheMonthDate) {
          const gameDate = new Date(edge.node.gameOfTheMonthDate).toLocaleDateString("en-US", {year: 'numeric',month: 'numeric',}).split('/').map(Number);
          return nowDate[0] === gameDate[0] && nowDate[1] === gameDate[1];
        }
        return false;
    });

    const selectedImage = (imgUrl) => {
        setGameShowcase(imgUrl);
        setActiveTrailerUrl('');
    };
    const selectedTrailler = (traillerUrl) => {
        setActiveTrailerUrl(traillerUrl);
        setGameShowcase('')
    };
    useEffect(() => {
        if (monthlyGames.length > 0) {
            setGamesMonthly(monthlyGames);
        } else {
            setGamesMonthly([]);
            console.log('Нет игр, этого месяца');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataGames])
    return <div className="h-[856px]">
        <div className="h-full flex flex-col items-center gap-8 container">
            <h2>Game Of The Month</h2>
            {gamesMonthly.map((edge) => (
                <div key={edge} className="flex flex-col gap-9"> 
                    <div className=" w-full flex h-[457px] gap-9">
                        <div className="w-[582px] flex flex-col justify-between h-full">
                            <div className="flex flex-col gap-3"> 
                                <h3>{edge.node.name}</h3>
                                <p className=" text-white">{edge.node.description}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between  w-full h-[108px] ">
                                    <div className="flex flex-col justify-between">
                                        <div className="flex items-center">
                                            <img className="w-8 h-8" src={metacritic} alt="" />
                                            <span className="text-[#FFCC00] text-2xl font-bold pl-3">{edge.node.metacriticScore}</span>
                                            <span className="text-[#979797]">{edge.node.metacriticScoreMax}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MdOutlineCalendarMonth className="text-white w-8 h-8"/>
                                            <span className="text-sm font-main text-white">{ new Date(edge.node.date).toLocaleDateString("en-US", {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center  justify-between">
                                        <h3>Available For:</h3>
                                        <div  className="flex gap-1">
                                            {edge.node.platform.map((platform, index) => (
                                                <span key={index} className="text-[#979797]">
                                                    {platform.value}{index < edge.node.platform.length - 1 ? ' -' : ''}
                                                </span>
                                            ))}
                                        </div>                                            
                                        <div>
                                            <h3>Genre:</h3>
                                            <span className="text-[#979797]">{edge.node.genre}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 w-full h-[68px]">
                                    {edge.node.platform.map((platform, index) => (
                                        <button className="px-1 w-full rounded-[10px] border border-solid border-[#979797] text-[#979797]" key={index}>{platform.value}</button>
                                    ))}
                                </div>
                                <div className="w-full h-[44px] flex  gap-3">
                                    <button className="opaqueButton w-1/2">Buy Now</button>
                                    <button className="transparentButton w-1/2">Game review</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[582px] flex flex-col justify-between"> 
                           <div className="flex justify-between w-full h-[51px] ">
                                <h3>Trailer & Gallery</h3>
                                <div>
                                    <button>Next</button>
                                    <button>Prev</button>
                                </div>
                           </div>
                           <div className="w-full h-[290px]">
                                {gameShowcase && (
                                    <div className="w-full h-full rounded-lg bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${gameShowcase})` }}></div>
                                    ) 
                                }
                                {activeTrailerUrl && (
                                    <iframe className="w-full h-full rounded-lg" src={`https://www.youtube.com/embed/${activeTrailerUrl}`} title={edge.node.name} allowFullScreen sandbox="allow-same-origin allow-scripts allow-popups allow-presentation" ></iframe>
                                    ) 
                                }
                           </div>
                           <div className="w-full h-[84px] flex justify-between items-center">
                                <img className="w-[129px] h-[60px]"  src={`https://img.youtube.com/vi/${edge?.node?.Trailler}/maxresdefault.jpg`} onClick={() => selectedTrailler(edge?.node?.Trailler)} alt="" />
                                {Object.values(edge.node.TraillerImg).map((img, index) => (img.url ? (
                                        <img key={index} src={img.url} alt={`фото-${index}`} className="w-[129px] h-[60px]" onClick={() => selectedImage(img.url)} />
                                    ) : null
                                ))} 
                           </div>
                        </div>
                    </div>
                    <div className="flex h-[297px] gap-9">
                        <div className="h-full">
                            <h3><span className="text-[#FF5733]">Minimum</span> System Requirments</h3>
                            <div className="flex flex-col gap-2 mt-3">
                                <div className="flex items-center">
                                    <h3>OS:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments.OS}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>CPU:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments.CPU}</span></h3>
                                </div>
                                <div className="flex items-center ">
                                    <h3>Memory:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments.Memory}</span></h3>
                                </div>
                                <div className="flex items-center ">
                                    <h3>GPU:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments.GPU}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>DirectX:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments.DirectX}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>Storage:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments.Storage}</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="h-full">
                            <h3><span className="text-[#FF5733]">Recommended</span> System Requirments</h3>
                            <div className="flex flex-col gap-2 mt-3">
                                <div className="flex items-center">
                                    <h3>OS:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments.OS}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>CPU:<span className="text-[#B9B9B9] text-base pl-2" >{edge.node.RecommendedSystemRequirments.CPU}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>Memory:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments.Memory}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>GPU:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments.GPU}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>DirectX:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments.DirectX}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>Storage:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments.Storage}</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="h-full bg-[#181724] rounded-xl flex flex-col gap-3 py-2 px-4" >
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-white font-medium">RAM</label>
                                    <div className="relative h-[32px] w-full">
                                        <input type="text" className="border border-[#D9D9D9] border-solid rounded-sm px-2 h-full w-full bg-transparent" />
                                        <div className="absolute top-1 left-2 flex items-center gap-2">
                                            <RiRam2Line className="text-white w-6 h-6"/>
                                            <span className="text-[#FFFFFF] text-[10px]">Enter Your RAM Storage</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 relative">
                                    <label className="text-xs text-white font-medium">GPU</label>
                                    <div className="relative h-[32px] w-full">
                                        <input type="text" className="border border-[#D9D9D9] border-solid rounded-sm px-2 text-[#FFFFFF] text-[10px] h-full w-full bg-transparent" />
                                        <div className="absolute top-1 left-2 flex items-center gap-2">
                                            <BsGpuCard className="text-white w-6 h-6"/>
                                            <span className="text-[#FFFFFF] text-[10px]">Enter Your GPU State</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 relative">
                                    <label className="text-xs text-white font-medium">CPU</label>
                                    <div className="relative h-[32px] w-full">
                                        <input type="text"  className="border border-[#D9D9D9] border-solid rounded-sm px-2 text-[#FFFFFF] text-[10px] h-full w-full bg-transparent " />
                                        <div className="absolute top-1 left-2 flex items-center gap-2">
                                            <FiCpu className="text-white w-6 h-6"/>
                                            <span className="text-[#FFFFFF] text-[10px]">Enter Your CPU Details</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[344px] flex flex-col gap-2">
                                <button className="w-full opaqueButton h-[40px]">Can I Run It?</button>
                                <button className="w-full transparentButton h-[40px]">Test My PC Automaticly</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}
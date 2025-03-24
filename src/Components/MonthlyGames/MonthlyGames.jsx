import { useEffect, useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import metacritic from '../../assets/main/metacritic.png'
import { RiRam2Line } from "react-icons/ri";
import { BsGpuCard } from "react-icons/bs";
import { FiCpu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

export const MonthlyGames = ({dataGames}) => {
    const [gamesMonthly, setGamesMonthly] = useState([]);
    const [activeContent, setActiveContent] = useState(() => {
        const trailer = dataGames?.games?.edges.find(edge => edge?.node?.Trailler)?.node?.Trailler || null;
        return trailer ? {type: 'trailer', url: trailer} : {type: 'image', url: null }
    });
    const [fullScrean, setFullScrean] = useState(false);

    const [ramInputActive, setRamInputActive] = useState(false);
    const [gpuInputActive, setGpuInputActive] = useState(false);
    const [cpuInputActive, setCpuInputActive] = useState(false);
  
    
    const nowDate = new Date().toLocaleDateString("en-US", {year: 'numeric',month: 'numeric',}).split('/').map(Number) 
    const monthlyGames = dataGames?.games?.edges.filter((edge) => {
        if (edge.node.gameOfTheMonthDate) {
          const gameDate = new Date(edge.node.gameOfTheMonthDate).toLocaleDateString("en-US", {year: 'numeric',month: 'numeric',}).split('/').map(Number);
          return nowDate[0] === gameDate[0] && nowDate[1] === gameDate[1];
        }
        return false;
    });
    
    const handelFullScrean = () => {
        setFullScrean(true);
    };
    const handelCloseFullScrean = () => {
        setFullScrean(false);
    };

    const handelContetnChange = (type, url) => {
        setActiveContent({type, url});
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
    useEffect(() => {
        if (fullScrean === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [fullScrean]);

    return <div className="max-lg:px-6">
        <div className="h-full flex flex-col gap-8  container">
            <h2 className="text-center">Game Of The Month</h2>
            {gamesMonthly.map((edge) => (
                <div key={edge} className="flex flex-col items-center gap-8 max-lg:gap-6"> 
                    <div className=" w-full flex max-lg:flex-col max-desktop:items-center justify-between max-lg:gap-6">
                        <div className="w-[582px] max-desktop:w-[430px] max-lg:w-[400px] max-md:w-[382px] max-phone:!w-full flex flex-col justify-between h-full gap-4">
                            <div className="flex flex-col gap-3"> 
                                <h3>{edge.node.name}</h3>
                                <p className=" text-white max-desktop:text-sm">{edge.node.description}</p>
                            </div>
                            <div className="flex flex-col gap-4 max-desktop:gap-3">
                                <div className="flex justify-between gap-7 max-md:gap-2 w-full ">
                                    <div className="flex flex-col justify-between max-lg:justify-start max-lg:gap-4">
                                        <div className="flex items-center">
                                            <img className="w-8 h-8" src={metacritic} alt="" />
                                            <h2 className="!text-[#FFCC00] text-2xl font-bold !pl-3">{edge.node.metacriticScore}</h2>
                                            <span className="text-[#979797]">/{edge.node.metacriticScoreMax}</span>
                                        </div>
                                        <div className="flex items-center gap-3 max-md:gap-1">
                                            <MdOutlineCalendarMonth className="text-white w-8 h-8"/>
                                            <span className="text-sm font-main text-white whitespace-nowrap">{ new Date(edge.node.date).toLocaleDateString("en-US", {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-between">
                                        <div className="flex flex-col items-center">
                                            <h3 className="max-md:!text-lg">Available For:</h3>
                                            <div className="flex items-center justify-center gap-1 flex-wrap whitespace-normal">
                                                {edge.node.platform.map((platform, index) => (
                                                    <span key={index} className="text-[#979797]">
                                                        {platform.value}{index < edge.node.platform.length - 1 ? ' -' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>                                            
                                        <div className="flex flex-col items-center">
                                            <h3 className="max-md:!text-lg">Genre:</h3>
                                            <div className="flex items-center gap-2">
                                                {edge.node.genre.map((genre, index) => (
                                                    <span key={index} className="text-[#979797]">{genre.value}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 w-full">
                                    {edge.node.platform.map((platform, index) => (
                                        <button className="py-0.5 w-full rounded-[10px] border border-solid border-[#979797] text-[#979797]" key={index}>{platform.value}</button>
                                    ))}
                                </div>
                                <div className="w-full flex gap-3">
                                    <button className="opaqueButton rounded-[20px] w-1/2 py-2 max-lg:py-1.5">Buy Now</button>
                                    <button className="transparentButton rounded-[20px] w-1/2 py-2 max-lg:py-1.5">Game review</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[582px] max-desktop:w-[430px] max-lg:w-[400px] max-md:w-[382px] max-phone:!w-full flex flex-col justify-between whitespace-nowrap gap-4"> 
                           <div className="flex justify-between w-full">
                                <h3>Trailer & Gallery</h3>
                                <div>
                                    <button>Next</button>
                                    <button>Prev</button>
                                </div>
                           </div>
                           <div className="w-full h-[290px] max-desktop:h-[285px] relative">
                           {activeContent.type === 'trailer' ? (
                                    <iframe className="w-full h-full rounded-lg" src={`https://www.youtube.com/embed/${activeContent.url}`} title={edge.node.name} allowFullScreen sandbox="allow-same-origin allow-scripts allow-popups allow-presentation" ></iframe>
                                ) : (
                                    <button className="w-full h-full rounded-lg bg-no-repeat bg-center bg-cover after:content-[''] after:absolute after:w-full after:top-0 after:left-0  after:h-full  after:bg-black/20 after:rounded-lg" style={{ backgroundImage: `url(${activeContent.url})`}} onClick={handelFullScrean}></button>
                                )}
                           </div>
                            <div className={`top-0 left-0 w-full h-full bg-op bg-black/50 flex justify-center items-center z-20 ${fullScrean ? "fixed" : "hidden"}`} onClick={handelCloseFullScrean}>
                                <img src={activeContent.url} alt="" className="max-w-full max-h-full object-contain cursor-pointer"  />
                                <button className="absolute top-5 right-9 text-white text-3xl cursor-pointer" onClick={handelCloseFullScrean}><IoCloseSharp/></button>
                            </div>
                            <div className="w-full h-[84px] flex items-center gap-3 relative whitespace-nowrap overflow-x-auto">
                                <button onClick={() => {handelContetnChange('trailer', edge?.node?.Trailler)}} className={`flex-shrink-0 border-none bg-cover bg-center bg-no-repeat rounded-sm ${activeContent.url === edge?.node?.Trailler ? 'w-[157px]  h-full' : 'w-[129px] max-desktop:w-[83px] max-lg:w-[67px] h-[60px]'} relative after:content-[''] after:cursor-pointer after:absolute after:w-full after:top-0 after:left-0  after:h-full  after:bg-black/40`} style={{backgroundImage: `url(https://i.ytimg.com/vi/${edge?.node?.Trailler}/maxresdefault.jpg)`}}></button>
                                {Object.values(edge.node.TraillerImg).map((img) => (img.url ? (
                                        <button key={img.id || img.url} onClick={() => {handelContetnChange('image', img.url)}} className={`flex-shrink-0 border-none bg-cover bg-center bg-no-repeat rounded-sm ${activeContent.url === img.url ? 'w-[157px]  h-full' : 'w-[129px] max-desktop:w-[83px] max-lg:w-[67px] h-[60px]'} relative after:content-[''] after:cursor-pointer after:absolute after:w-full after:top-0 after:left-0  after:h-full  after:bg-black/40`}  style={{backgroundImage: `url(${img.url})`}}></button>
                                ) : null))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-9 max-md:gap-6 max-md:flex-col">
                        <div className="h-full flex-1">
                            <h3 className="max-desktop:!text-base"><span className="text-[#FF5733]">Minimum</span> System Requirments</h3>
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
                        <div className="h-full flex-1">
                            <h3 className="max-desktop:!text-base"><span className="text-[#FF5733]">Recommended</span> System Requirments</h3>
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
                        <div className="h-full bg-[#181724] rounded-xl flex-1">
                            <div className="py-2 px-4 h-full flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-white font-medium">RAM</label>
                                        <div className="relative h-[32px] w-full">
                                            <input type="text" className="border border-[#D9D9D9] border-solid rounded-sm px-2 text-[#FFFFFF] text-[10px] h-full w-full bg-transparent" onFocus={() => setRamInputActive(true)} onBlur={(e) => !e.target.value.trim() && setRamInputActive(false)}/>
                                            {!ramInputActive && (
                                                <div className="absolute top-1 left-2 flex items-center gap-2 pointer-events-none">
                                                    <RiRam2Line className="text-white w-6 h-6"/>
                                                    <span className="text-[#FFFFFF] text-[10px]">Enter Your RAM Storage</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 relative">
                                        <label className="text-xs text-white font-medium">GPU</label>
                                        <div className="relative h-[32px] w-full">
                                            <input type="text" className="border border-[#D9D9D9] border-solid rounded-sm px-2 text-[#FFFFFF] text-[10px] h-full w-full bg-transparent" onFocus={() => setGpuInputActive(true)} onBlur={(e) => !e.target.value.trim() && setGpuInputActive(false)}/>
                                            {!gpuInputActive && (
                                                <div className="absolute top-1 left-2 flex items-center gap-2 pointer-events-none">
                                                    <BsGpuCard className="text-white w-6 h-6"/>
                                                    <span className="text-[#FFFFFF] text-[10px]">Enter Your GPU State</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 relative">
                                        <label className="text-xs text-white font-medium">CPU</label>
                                        <div className="relative h-[32px] w-full">
                                            <input type="text"  className="border border-[#D9D9D9] border-solid rounded-sm px-2 text-[#FFFFFF] text-[10px] h-full w-full bg-transparent " onFocus={() => setCpuInputActive(true)} onBlur={(e) => !e.target.value.trim() && setCpuInputActive(false)}/>
                                            {!cpuInputActive && (
                                                <div className="absolute top-1 left-2 flex items-center gap-2 pointer-events-none">
                                                    <FiCpu className="text-white w-6 h-6"/>
                                                    <span className="text-[#FFFFFF] text-[10px]">Enter Your CPU Details</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <button className="w-full opaqueButton rounded-2xl h-[40px]">Can I Run It?</button>
                                    <button className="w-full transparentButton rounded-2xl h-[40px]">Test My PC Automaticly</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}
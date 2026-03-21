import { useEffect, useState } from "react";
import metacritic from '../../assets/main/metacritic.png'
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoCloseSharp, IoClose, IoRocket, IoWarning } from "react-icons/io5";
import { SystemRequirements } from "./SystemRequirements/SystemRequirements";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export const MonthlyGames = ({dataGames}) => {
    const [gamesMonthly, setGamesMonthly] = useState([]);
    const [activeContent, setActiveContent] = useState(() => {
        const trailer = dataGames?.games?.edges.filter(edge => edge?.node?.Trailler).map(edge => edge.node.Trailler) || null;
        return trailer ? {type: 'trailer', url: trailer} : {type: 'image', url: null }
    });
    const [fullScrean, setFullScrean] = useState(false);
    const [modalCheckPc, setModalCheckPc] = useState(false);
    const [slide, setSlide] = useState(0);
    const [dataPcResult, setDataPcResult ] = useState({
        ram: '',
        cpu: '',
        gpu: '',
        status: {
            ram: null,
            cpu: null,
            gpu: null,
        }
    });

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
    const handelCloseModalCheckPc = () => {
        setModalCheckPc(false);
    };
    
    const handlePcCheckResults = (results) => {
        setDataPcResult(results);
    };
    const handelContetnChange = (type, url) => {
        setActiveContent({type, url});
    };
    const buutonNext = () => {
        if(slide < gamesMonthly.length - 1){ 
            setSlide(slide + 1);
        }
    };
    const buutonPrev = () => {
        if(slide > 0){
            setSlide(slide - 1);
        }
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
        if (fullScrean === true || modalCheckPc === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [fullScrean, modalCheckPc]);
    return <div className="max-lg:px-6">
        <div className="h-full flex flex-col gap-8  container">
            <h2 className="text-center">Game Of The Month</h2>
            {gamesMonthly.length > 0 ? (
                gamesMonthly.map((edge, index) =>
                    index === slide && (
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
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <button className="buttonSwitch py-1.5 px-3" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buutonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                                            <button className={`buttonSwitch py-1.5 px-3  ${slide < gamesMonthly.length - 1 ? 'cursor-pointer' : 'cursor-auto'} `} style={{border: slide < gamesMonthly.length - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buutonNext}><GrLinkNext style={{color: slide < gamesMonthly.length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                                        </div>
                                        <div className="h-[12px] flex justify-between items-center gap-[13px]">
                                            {gamesMonthly.map((_, index) =>
                                                <div key={index} className={`w-[7px] h-[7px] bg-[#452154] rounded-3xl ${slide === index ? 'w-[28px] bg-[#FF5733] h-full' : ''}`}></div>
                                                )
                                            }
                                        </div>
                                    </div>
                               </div>
                               <div className="w-full h-[290px] max-desktop:h-[285px] relative">
                               {activeContent.type === 'trailer' ? (
                                    <iframe className="w-full h-full rounded-lg" src={`https://www.youtube.com/embed/${edge?.node?.Trailler}`} title={edge.node.name} allowFullScreen sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"></iframe>
                                    ) : activeContent.type === 'image' ? (
                                        <button className="w-full h-full rounded-lg bg-no-repeat bg-center bg-cover after:content-[''] after:absolute after:w-full after:top-0 after:left-0 after:h-full after:bg-black/20 after:rounded-lg" style={{ backgroundImage: `url(${activeContent.url})` }} onClick={handelFullScrean}></button>
                                    ) : (
                                        <p>Нема трейлера</p>
                                    )}
                               </div>
                                <div className={`top-0 left-0 w-full h-full bg-op bg-black/50 flex justify-center items-center z-20 ${fullScrean ? "fixed" : "hidden"}`} onClick={handelCloseFullScrean}>
                                    <img src={activeContent.url} alt="" className="max-w-full max-h-full object-contain cursor-pointer"  />
                                    <button className="absolute top-5 right-9 text-white text-3xl cursor-pointer" onClick={handelCloseFullScrean}><IoCloseSharp/></button>
                                </div>
                                <div className="w-full h-[84px] flex items-center justify-between gap-3 relative whitespace-nowrap overflow-x-auto">
                                    <button onClick={() => {handelContetnChange('trailer', edge?.node?.Trailler)}} className={`flex-shrink-0 border-none bg-cover bg-center bg-no-repeat rounded-sm ${activeContent.url === edge?.node?.Trailler ? 'w-[157px]  h-full' : 'w-[129px] max-desktop:w-[83px] max-lg:w-[67px] h-[60px]'} relative after:content-[''] after:cursor-pointer after:absolute after:w-full after:top-0 after:left-0  after:h-full  after:bg-black/40`} style={{backgroundImage: `url(https://i.ytimg.com/vi/${edge?.node?.Trailler}/maxresdefault.jpg)`}}></button>
                                    {edge.node.TraillerImg && Object.values(edge.node.TraillerImg).map((img) => (img.url ? (
                                            <button key={img.id || img.url} onClick={() => {handelContetnChange('image', img.url)}} className={`flex-shrink-0 border-none bg-cover bg-center bg-no-repeat rounded-sm ${activeContent.url === img.url ? 'w-[157px]  h-full' : 'w-[129px] max-desktop:w-[83px] max-lg:w-[67px] h-[60px]'} relative after:content-[''] after:cursor-pointer after:absolute after:w-full after:top-0 after:left-0  after:h-full  after:bg-black/40`}  style={{backgroundImage: `url(${img.url})`}}></button>
                                    ) : null))}
                                </div>
                            </div>
                        </div>
                        <SystemRequirements edge={edge} gamesMonthly={gamesMonthly} slide={slide} setModalCheckPc={setModalCheckPc} onPcCheckResults={handlePcCheckResults}/>
                        {modalCheckPc && (
                            <div className={`top-0 left-0 w-full h-full bg-op bg-black/50 flex justify-center items-center z-20 max-desktop:p-8 ${modalCheckPc ? "fixed" : "hidden"}`} onClick={handelCloseModalCheckPc}>
                                <div className="bg-[#181724] p-8 max-md:p-5 flex flex-col gap-3 rounded-2xl" onClick={(e) => e.stopPropagation()}>
                                    <h2 className="text-center">Результаты тестов ваше пк по игре: {edge.node.name}</h2>
                                    <h3 className="max-md:!text-lg">Ваша оперативная память: <span className="text-lg max-lg:text-base max-md:text-sm !text-[#D3D3D3]">{dataPcResult.ram.message}</span></h3>
                                    <h3 className="max-md:!text-lg">Ваша видеокарта: <span className="text-lg max-lg:text-base max-md:text-sm !text-[#D3D3D3]">{dataPcResult.gpu.message}</span></h3>
                                    <h3 className="max-md:!text-lg">Ваш процессор: <span className="text-lg max-lg:text-base max-md:text-sm !text-[#D3D3D3]">{dataPcResult.cpu.message}</span></h3>
                                    {(dataPcResult.status.ram === 'bad' || dataPcResult.status.gpu === 'bad' || dataPcResult.status.cpu === 'bad') && (
                                        <div className="flex flex-col gap-4">
                                            {dataPcResult.status.ram === 'bad' && (
                                                <div className="flex items-center gap-1  text-red-500" >
                                                    <span className="max-md:text-xs max-phone:w-[200px]">Вашей оперативной памяти недостаточно</span> 
                                                    <IoClose className="text-xl"/>
                                                </div>
                                            )}
                                            {dataPcResult.status.gpu === 'bad' && (
                                                <div className="flex items-center gap-1 text-red-500">
                                                    <span className="max-md:text-xs max-phone:w-[200px]">Ваша видеокарта не соответствует минимальным требованиям</span> 
                                                    <IoClose className="text-xl"/>
                                                </div>
                                            )}
                                            {dataPcResult.status.cpu === 'bad' && (
                                                <div className="flex items-center gap-1 text-red-500">
                                                    <span className="max-md:text-xs max-phone:w-[200px]">Ваш процессор не соответствует минимальным требованиям</span> 
                                                    <IoClose className="text-xl"/>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {(dataPcResult.status.ram === 'minimum' || dataPcResult.status.gpu === 'minimum' || dataPcResult.status.cpu === 'minimum') && (
                                        <div className="flex flex-col gap-2">
                                            {dataPcResult.status.ram === 'minimum' && (
                                                <div className="flex items-center gap-1 text-orange-500">
                                                    <span className="max-md:text-xs max-phone:w-[200px]">Ваша оперативная память подходит для минимальных настроек</span>
                                                    <IoWarning className="text-xl"/>
                                                </div>
                                            )}
                                            {dataPcResult.status.gpu === 'minimum' && (
                                                <div className="flex items-center gap-1 text-orange-500">
                                                    <span className="max-md:text-xs max-phone:w-[200px]" >Ваша видеокарта подходит для минимальных настроек</span>
                                                    <IoWarning className="text-xl"/>
                                                </div>
                                            )}
                                            {dataPcResult.status.cpu === 'minimum' && (
                                                <div className="flex items-center gap-1 text-orange-500">
                                                    <span className="max-md:text-xs max-phone:w-[200px]">Ваш процессор подходит для минимальных настроек</span>
                                                    <IoWarning className="text-xl"/>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {(dataPcResult.status.ram === 'recommended' || (dataPcResult.status.gpu === 'recommended' || dataPcResult.status.gpu === 'aboveRecommended') || dataPcResult.status.cpu === 'recommended') && (
                                        <div className="flex flex-col gap-2">
                                            {dataPcResult.status.ram === 'recommended' && (
                                                <div className="flex items-center gap-1 text-green-500">
                                                    <span className="max-md:text-xs max-phone:w-[200px]">Ваша оперативная память подходит для рекомендуемых настроек</span> 
                                                    <IoRocket className="text-xl"/>
                                                </div>
                                            )}
                                            {(dataPcResult.status.gpu === 'recommended' || dataPcResult.status.gpu === 'aboveRecommended') && (
                                                <div className="flex items-center gap-1 text-green-500">
                                                    <span className="max-md:text-xs max-phone:w-[200px]">Ваша видеокарта подходит для рекомендуемых настроек</span> 
                                                    <IoRocket className="text-xl"/>
                                                </div>
                                            )}
                                            {dataPcResult.status.cpu === 'recommended' && (
                                                <div className="flex items-center gap-1 text-green-500">
                                                    <span className="max-md:text-xs max-phone:w-[200px]">Ваш процессор подходит для рекомендуемых настроек</span> 
                                                    <IoRocket className="text-xl"/>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <button className="absolute top-5 right-9 text-white text-3xl cursor-pointer" onClick={handelCloseModalCheckPc}><IoCloseSharp/></button>
                            </div>
                        )}
                    </div>
                ))
            ) : ( 
                <h2>Нету игр месяца</h2>
            )}
        </div>
    </div>
}
import { useEffect, useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import metacritic from '../../assets/main/metacritic.png'
import { IoCloseSharp } from "react-icons/io5";
import { SystemRequirements } from "./SystemRequirements/SystemRequirements";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export const MonthlyGames = ({dataGames}) => {
    const [gamesMonthly, setGamesMonthly] = useState([]);
    const [activeContent, setActiveContent] = useState(() => {
        const trailer = dataGames?.games?.edges.filter(edge => edge?.node?.Trailler).map(edge => edge.node.Trailler) || null;;
        return trailer ? {type: 'trailer', url: trailer} : {type: 'image', url: null }
    });
    const [fullScrean, setFullScrean] = useState(false);
    const [slide, setSlide] = useState(0);

<<<<<<< HEAD
    const [ramInputActive, setRamInputActive] = useState(true);
    const [gpuInputActive, setGpuInputActive] = useState(true);
    const [cpuInputActive, setCpuInputActive] = useState(true);
    
    const [ramValue, setRamValue] = useState('');
    const [gpuValue, setGpuValue] = useState('');
    const [cpuValue, setCpuValue] = useState('');
    
    const [isFormValid, setIsFormValid] = useState(false);

    
    const isValidRamInput = /^\d+\s*(GB|MB)?$/i;   
    const isValidGPUInput = /^(NVIDIA|AMD|Intel)\s?(GeForce|Radeon|Arc)?\s?\w*\s?\d+$/i;
    const isValidCPUInput = /^(Intel\sCore\s[iI]\d{1,2}-\d{3,4}|AMD\sRyzen\s\d{1,2}\s\d{3,4})$/i;

    const handelChangeValueRam = (e) => {
        setRamValue(e.target.value);
        setIsFormValid(false);
    }
    const handelChangeValueGPU = (e) => {
        setGpuValue(e.target.value);
        setIsFormValid(false);
    };
    const handelChangeValueCPU = (e) => {
        setCpuValue(e.target.value);
        setIsFormValid(false);
    };

    const extractNumberInput = (input) => input.match(/\d+/)?.[0] * 1 || ''; 
    const checkPcRam = () => {
        const currentGame = gamesMonthly[slide]?.node;
        const ramMin = currentGame?.MinimumSystemRequirments?.Memory || '';
        const ramRecommended = currentGame?.RecommendedSystemRequirments?.Memory || '';
<<<<<<< HEAD
        
=======

>>>>>>> GamesMonthly
        if(extractNumberInput(ramValue) < extractNumberInput(ramMin)){
            return "Недостаточно оперативной памяти для минимальных требований";
        } else if (extractNumberInput(ramValue) >= extractNumberInput(ramMin) && extractNumberInput(ramValue) <= extractNumberInput(ramRecommended)){
            return "Оперативная память соответствует минимальным требованиям";
        } else if(extractNumberInput(ramValue) >= extractNumberInput(ramRecommended)){
            return "Оперативная память соответствует рекомендованным требованиям";
        }
        return null;
    }    
    const checkPcCpu = () => {
        const currentGame = gamesMonthly[slide]?.node;
        const cpuMin = currentGame?.MinimumSystemRequirments?.CPU || [];
        const cpuRecommended = currentGame?.RecommendedSystemRequirments?.CPU || [];
<<<<<<< HEAD

=======
>>>>>>> GamesMonthly

        const cpuModelInput = parseInt(cpuValue.split('-')[1], 10); 
        
        if (cpuValue?.split(' ')[0]?.toLowerCase()  === 'intel') {
            const cpuMinIntel  = cpuMin.find(cpu => cpu.toLowerCase().includes('intel'));
            const cpuRecommendedIntel  = cpuRecommended.find(cpu => cpu.toLowerCase().includes('intel'));
            

            if (!cpuMinIntel || !cpuRecommendedIntel) return "Данные о минимальных или рекомендованных требованиях отсутствуют";
            
            const cpuTypeInputIntel = parseInt(cpuValue.split(' ')[2]?.replace(/\D/g, ''), 10);
            const cpuTypeMinIntel = parseInt(cpuMinIntel.split(' ')[2]?.replace(/\D/g, ''), 10);
            const cpuTypeRecommendedIntel = parseInt(cpuRecommendedIntel.split(' ')[2]?.replace(/\D/g, ''), 10);
            const cpuModelRecommendedIntel = parseInt(cpuRecommendedIntel.split('-')[1], 10);

            if (cpuTypeInputIntel < cpuTypeMinIntel) {
                return "Недостаточно процессора Intel для минимальных требований";
            } 
            else if ((cpuTypeInputIntel < cpuTypeRecommendedIntel && cpuModelInput < cpuModelRecommendedIntel)) {
                return "Процессор Intel соответствует минимальным требованиям";
            }
            else {
                return "Процессор Intel соответствует рекомендованным требованиям";
            } 
        } else if(cpuValue?.split(' ')[0]?.toLowerCase() === 'amd'){
            const cpuMinAmd = cpuMin.find(cpu => cpu.toLowerCase().includes('amd'));
            const cpuRecommendedAmd = cpuRecommended.find(cpu => cpu.toLowerCase().includes('amd'));
        
            if (!cpuMinAmd || !cpuRecommendedAmd) return "Данные о минимальных или рекомендованных требованиях отсутствуют";
        
            const cpuTypeInputAmd = parseInt(cpuValue.split(' ')[2], 10);
            const cpuTypeMinAmd = parseInt(cpuMinAmd.split(' ')[2], 10);
            const cpuTypeRecommendedAmd = parseInt(cpuRecommendedAmd.split(' ')[2], 10);

        
            const cpuModelInput = parseInt(cpuValue.split(' ')[1], 10);
            const cpuModelMinAmd = parseInt(cpuMinAmd.split(' ')[1], 10);  
            const cpuModelRecommendedAmd = parseInt(cpuRecommendedAmd.split(' ')[1], 10);
        
            if (cpuTypeInputAmd < cpuTypeMinAmd || (cpuTypeInputAmd === cpuTypeMinAmd && cpuModelInput < cpuModelMinAmd)) {
                return "Недостаточно процессора AMD для минимальных требований";
            } 
            // Если процессор соответствует минимальным, но не рекомендованным требованиям
            else if (cpuTypeInputAmd < cpuTypeRecommendedAmd || (cpuTypeInputAmd === cpuTypeRecommendedAmd && cpuModelInput < cpuModelRecommendedAmd)) {
                return "Процессор AMD соответствует минимальным требованиям";
            } 
            // Если процессор соответствует рекомендованным требованиям
            else {
                return "Процессор AMD соответствует рекомендованным требованиям";
            }
        }else {
            return 'Это не процессор Intel и Amd';
        }
    }
    const checkPcGpu = () => {
        const currentGame = gamesMonthly[slide]?.node;
        const gpuMin = currentGame?.MinimumSystemRequirments?.GPU || [];
        const gpuRecommended = currentGame?.RecommendedSystemRequirments?.GPU || [];

        const gpuModelInput = RegExp(/\d+/).exec(gpuValue)?.[0];

    if(gpuValue?.split(' ')[0]?.toLowerCase() === 'nvidia') {
            const gpuModelMinNvidia =  parseInt(gpuMin[0].match(/\d+/)?.[0], 10);
            const gpuModelRecommendedNvidia =  parseInt(gpuRecommended[0].match(/\d+/)?.[0], 10);
            if(gpuModelInput < gpuModelMinNvidia){
                return 'Видеокарта Nvidia не подходит для минимальных';
            } else if (gpuModelInput >= gpuModelMinNvidia && gpuModelInput < gpuModelRecommendedNvidia ){
                return 'Видеокарта Nvidia подходит под минимальные требования';
            } else if (gpuModelInput >= gpuModelRecommendedNvidia) {
                return 'Видеокарта Nvidia подходит для рекомендуеммых требований'
            }
        } else if (gpuValue?.split(' ')[0]?.toLowerCase()  === 'amd'){
            const gpuModelMinAmd =  parseInt(gpuMin[1].match(/\d+/)?.[0], 10);
            const gpuModelRecommendedAmd =  parseInt(gpuRecommended[1].match(/\d+/)?.[0], 10);
            if(gpuModelInput < gpuModelMinAmd){
                return 'Видеокарта Amd не подходит для минимальных';
            } else if (gpuModelInput >= gpuModelMinAmd && gpuModelInput < gpuModelRecommendedAmd ){
                return 'Видеокарта Amd подходит под минимальные требования';
            } else if (gpuModelInput >= gpuModelRecommendedAmd) {
                return 'Видеокарта Amd подходит для рекомендуеммых требований'
            }
        }
        else if (gpuValue?.split(' ')[0]?.toLowerCase()  === 'intel'){
            const gpuModelRecommendedIntel=  parseInt(gpuRecommended[2].match(/\d+/)?.[0], 10);
            if(gpuModelInput < gpuModelRecommendedIntel){
                return 'Видеокарта Intel не подходит для рекомендованых';
            } else if (gpuModelInput >= gpuModelRecommendedIntel) {
                return 'Видеокарта Intel подходит для рекомендуеммых требований'
            }
        }
         else{
            return 'Это не Nvidia, Amd и Intel'
        }
    }
    const handelCheckPc = () => {
        const isRamValid = isValidRamInput.test(ramValue) && ramValue.trim() !== '';
        const isGpuValid = isValidGPUInput.test(gpuValue) && gpuValue.trim() !== '';
        const isCpuValid = isValidCPUInput.test(cpuValue) && cpuValue.trim() !== '';
        
        setIsFormValid(!(isRamValid && isGpuValid && isCpuValid));
        if(isRamValid && isGpuValid && isCpuValid) {
            console.log(`Ваша память ${ramValue}`, checkPcRam())
            console.log(`Ваша процессор ${cpuValue}`, checkPcCpu())
            console.log(`Ваша видеокарта${gpuValue}`, checkPcGpu())
        } else {
            console.log('Данные не ввёл')
        }
    };

=======
>>>>>>> GamesMonthly
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
            {gamesMonthly.map((edge, index) =>
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
                    <SystemRequirements edge={edge} gamesMonthly={gamesMonthly} slide={slide}/>
                </div>
            ))}
        </div>
    </div>
}
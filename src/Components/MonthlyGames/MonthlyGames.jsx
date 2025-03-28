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
        const trailer = dataGames?.games?.edges.filter(edge => edge?.node?.Trailler).map(edge => edge.node.Trailler) || null;;
        return trailer ? {type: 'trailer', url: trailer} : {type: 'image', url: null }
    });
    const [fullScrean, setFullScrean] = useState(false);
    const [slide, setSlide] = useState(0);

    const [ramInputActive, setRamInputActive] = useState(true);
    const [gpuInputActive, setGpuInputActive] = useState(true);
    const [cpuInputActive, setCpuInputActive] = useState(true);
    
    const [ramValue, setRamValue] = useState('');
    const [gpuValue, setGpuValue] = useState('');
    const [cpuValue, setCpuValue] = useState('');
    
    const [isFormValid, setIsFormValid] = useState(false);

    
    const isValidRamInput = /^\d+\s*(GB|MB)?$/i;   
    const isValidGPUInput = /^(NVIDIA|AMD|Intel)\s?(GeForce|Radeon|Arc)?\s?\w*\s?\d+$/i;
    const isValidCPUInput = /^(Intel\sCore\s[iI]\d{1,2}-\d{3,4}|AMD\sRyzen\s\d{1,2}-\d{3,4})$/i;

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


        const cpuTypeInput = cpuValue.split(' ')[2]?.split('-')[0];
        const cpuModelInput = parseInt(cpuValue.split('-')[1], 10); 
        
        if (cpuValue?.split(' ')[0]?.toLowerCase()  === 'intel') {
            const cpuTypeMinIntel = cpuMin[0]?.split(' ')[2]?.split('-')[0];
            const cpuTypeRecommendedIntel = cpuRecommended[0]?.split(' ')[2]?.split('-')[0];
            
            const cpuModelMinIntel = parseInt(cpuMin[0]?.split('-')[1], 10);  
            const cpuModelRecommendedIntel = parseInt(cpuRecommended[0]?.split('-')[1], 10);  
            if (cpuTypeInput < cpuTypeMinIntel && cpuModelInput < cpuModelMinIntel ) {
                return "Недостаточно процессора Intel для минимальных требований";
            } 
            else if ((cpuTypeInput >= cpuTypeMinIntel || cpuModelInput >= cpuModelMinIntel) && (cpuTypeInput < cpuTypeRecommendedIntel || cpuModelInput < cpuModelRecommendedIntel)) {
                return "Процессор Intel соответствует минимальным требованиям";
            } 
            else if (cpuTypeInput >= cpuTypeRecommendedIntel || cpuModelInput >= cpuModelRecommendedIntel) {
                return "Процессор Intel соответствует рекомендованным требованиям";
            } 
        } else if(cpuValue?.split(' ')[0]?.toLowerCase()  === 'amd'){
            const cpuTypeMinAmd = cpuMin[1]?.split(' ')[2]?.split('-')[0];
            const cpuTypeRecommendedAmd = cpuRecommended[1]?.split(' ')[2]?.split('-')[0];
    
            const cpuModelMinAmd = parseInt(cpuMin[1]?.split(' ')[3], 10);  
            const cpuModelRecommendedAmd = parseInt(cpuRecommended[1]?.split(' ')[3], 10);  
            if (cpuTypeInput < cpuTypeMinAmd || cpuModelInput < cpuModelMinAmd) {
                return "Недостаточно процессора Amd для минимальных требований";
            } 
            else if ((cpuTypeInput >= cpuTypeMinAmd && cpuModelInput >= cpuModelMinAmd) && 
                     (cpuTypeInput < cpuTypeRecommendedAmd || cpuModelInput < cpuModelRecommendedAmd)) {
                return "Процессор Amd соответствует минимальным требованиям";
            } 
            else if (cpuTypeInput >= cpuTypeRecommendedAmd && cpuModelInput >= cpuModelRecommendedAmd) {
                return "Процессор Amd соответствует рекомендованным требованиям";
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
                                <div>
                                    <button onClick={buutonNext}>Next</button>
                                    <button onClick={buutonPrev}>Prev</button>
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
                    <div className="flex gap-9 justify-between w-full max-md:gap-6 max-md:flex-col">
                        <div className="h-full flex-1">
                            <h3 className="max-desktop:!text-base"><span className="text-[#FF5733]">Minimum</span> System Requirments</h3>
                            <div className="flex flex-col gap-2 mt-3">
                                <div className="flex items-center">
                                    <h3>OS:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments?.OS || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>CPU:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments?.CPU.join(' / ') || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center ">
                                    <h3>Memory:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments?.Memory || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center ">
                                    <h3>GPU:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments?.GPU.join(' / ') || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>DirectX:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments?.DirectX || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>Storage:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.MinimumSystemRequirments?.Storage || 'Не указано'}</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="h-full flex-1">
                            <h3 className="max-desktop:!text-base"><span className="text-[#FF5733]">Recommended</span> System Requirments</h3>
                            <div className="flex flex-col gap-2 mt-3">
                                <div className="flex items-center">
                                    <h3>OS:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments?.OS || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>CPU:<span className="text-[#B9B9B9] text-base pl-2" >{edge.node.RecommendedSystemRequirments?.CPU.join(' / ') || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>Memory:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments?.Memory || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>GPU:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments?.GPU.join(' / ') || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>DirectX:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments?.DirectX || 'Не указано'}</span></h3>
                                </div>
                                <div className="flex items-center">
                                    <h3>Storage:<span className="text-[#B9B9B9] text-base pl-2">{edge.node.RecommendedSystemRequirments?.Storage || 'Не указано'}</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="h-full bg-[#181724] rounded-xl flex-1">
                            <div className="py-2 px-4 h-full flex flex-col gap-2">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-white font-medium">RAM</label>
                                        <div className="relative  w-full">
                                            <input type="text" className="border border-[#D9D9D9] border-solid rounded-sm px-2 text-[#FFFFFF] text-[10px] h-[32px] w-full bg-transparent" onChange={handelChangeValueRam} value={ramValue} onFocus={() => setRamInputActive(false)} onBlur={(e) => !e.target.value.trim() && setRamInputActive(true)}/>
                                            {ramInputActive && ramValue.trim() === '' && (
                                                <div className="absolute top-1 left-2 flex items-center gap-2 pointer-events-none">
                                                    <RiRam2Line className="text-white w-6 h-6"/>
                                                    <span className="text-[#FFFFFF] text-[10px]">Enter Your RAM Storage</span>
                                                </div>
                                            )}
                                            {!isValidRamInput.test(ramValue) && ramValue.trim() !== '' && (
                                                <p className="text-red-500 text-xs mt-2">Некорректный формат. Пример: 16 GB RAM или 512 MB RAM</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 relative">
                                        <label className="text-xs text-white font-medium">GPU</label>
                                        <div className="relative  w-full">
                                            <input type="text" className="border border-[#D9D9D9] border-solid rounded-sm px-2 text-[#FFFFFF] text-[10px] h-[32px] w-full bg-transparent" onChange={handelChangeValueGPU} value={gpuValue} onFocus={() => setGpuInputActive(false)} onBlur={(e) => !e.target.value.trim() && setGpuInputActive(true)}/>
                                            {gpuInputActive && gpuValue.trim('') === '' && (
                                                <div className="absolute top-1 left-2 flex items-center gap-2 pointer-events-none">
                                                    <BsGpuCard className="text-white w-6 h-6"/>
                                                    <span className="text-[#FFFFFF] text-[10px]">Enter Your GPU State</span>
                                                </div>
                                            )}
                                            {!isValidGPUInput.test(gpuValue) && gpuValue.trim() !== '' && (
                                                <p className="text-red-500 text-xs mt-2">Некорректный формат. Пример: NVIDIA GeForce RTX 3080 или AMD Radeon RX 6800</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 relative">
                                        <label className="text-xs text-white font-medium">CPU</label>
                                        <div className="relative w-full">
                                            <input type="text"  className="border border-[#D9D9D9] border-solid rounded-sm px-2 text-[#FFFFFF] text-[10px] h-[32px] w-full bg-transparent" onChange={handelChangeValueCPU} value={cpuValue} onFocus={() => setCpuInputActive(false)} onBlur={(e) => !e.target.value.trim() && setCpuInputActive(true)}/>
                                            {cpuInputActive && cpuValue.trim('') === '' && (
                                                <div className="absolute top-1 left-2 flex items-center gap-2 pointer-events-none">
                                                    <FiCpu className="text-white w-6 h-6"/>
                                                    <span className="text-[#FFFFFF] text-[10px]">Enter Your CPU Details</span>
                                                </div>
                                            )}
                                            {!isValidCPUInput.test(cpuValue) && cpuValue.trim() !== '' && (
                                                <p className="text-red-500 text-xs mt-2">Некорректный формат. Пример: Intel Core i7-9700 или AMD Ryzen 5-3600</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <button className="w-full opaqueButton rounded-2xl h-[40px]" onClick={() => handelCheckPc()} disabled={isFormValid}>Can I Run It?</button>
                                    {isFormValid &&  (
                                        <span className="text-red-500 text-xs mt-2">Введите пажалуйста все данные</span>
                                    )}
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
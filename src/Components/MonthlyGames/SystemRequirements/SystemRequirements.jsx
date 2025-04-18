import { RiRam2Line } from "react-icons/ri";
import { BsGpuCard } from "react-icons/bs";
import { FiCpu } from "react-icons/fi";
import { useState } from "react";

export const SystemRequirements = ({gamesMonthly, slide, edge, setModalCheckPc, onPcCheckResults}) => {
    const [ramInputActive, setRamInputActive] = useState(true);
    const [gpuInputActive, setGpuInputActive] = useState(true);
    const [cpuInputActive, setCpuInputActive] = useState(true);

    const [ramValue, setRamValue] = useState('');
    const [gpuValue, setGpuValue] = useState('');
    const [cpuValue, setCpuValue] = useState('');
    
    const [isFormValid, setIsFormValid] = useState(false);

    const isValidRamInput = /^\d+\s*(GB|MB)?$/i;
    const isValidGPUInput = /^(NVIDIA|AMD|Intel)\s*(GeForce|Radeon|Arc)?\s*\w*\s*\d+$/i;
    const isValidCPUInput = /^(Intel\s*Core\s*[iI]\d{1,2}-\d{3,4}|AMD\s*Ryzen\s*\d{1,2}\s*\d{3,4})$/i;

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
            return { status: "bad", message: `Вашей оперативной памяти (${ramValue})` };
        } else if (extractNumberInput(ramValue) >= extractNumberInput(ramMin) && extractNumberInput(ramValue) <= extractNumberInput(ramRecommended)){
            return { status: "minimum", message: `Ваша оперативная память (${ramValue})` };
        } else if(extractNumberInput(ramValue) >= extractNumberInput(ramRecommended)){
            return { status: "recommended", message: `Ваша оперативная память (${ramValue})` };
        }
        return { status: "unknown", message: "Не удалось определить соответствие оперативной памяти." };
    }    
    const checkPcCpu = () => {
        const currentGame = gamesMonthly[slide]?.node;
        const cpuMin = currentGame?.MinimumSystemRequirments?.CPU || [];
        const cpuRecommended = currentGame?.RecommendedSystemRequirments?.CPU || [];

        const cpuModelInput = parseInt(cpuValue.split(' ')[2]?.split('-')[1], 10); 
        
        if (cpuValue?.split(' ')[0]?.toLowerCase()  === 'intel') {
            const cpuMinIntel  = cpuMin.find(cpu => cpu.toLowerCase().includes('intel'));
            const cpuRecommendedIntel  = cpuRecommended.find(cpu => cpu.toLowerCase().includes('intel'));
            

            if (!cpuMinIntel || !cpuRecommendedIntel) return { status: "unknown", message: "Данные о минимальных или рекомендованных требованиях отсутствуют" };
            
            const cpuTypeInputIntel = parseInt(cpuValue.split(' ')[2]?.replace(/\D/g, ''), 10);
            const cpuTypeMinIntel = parseInt(cpuMinIntel.split(' ')[2]?.replace(/\D/g, ''), 10);
            
            const cpuTypeRecommendedIntel = parseInt(cpuRecommendedIntel.split(' ')[2]?.replace(/\D/g, ''), 10);
            const cpuModelRecommendedIntel = parseInt(cpuRecommendedIntel.split('-')[1], 10);
            
            if (cpuTypeInputIntel < cpuTypeMinIntel) {
                return { status: "bad", message: `Вашего процессора Intel (${cpuValue})` };
            } 
            else if (cpuTypeInputIntel >= cpuTypeMinIntel && (cpuModelInput < cpuModelRecommendedIntel || cpuTypeInputIntel < cpuTypeRecommendedIntel)) {
                return { status: "minimum", message: `Ваш процессор Intel (${cpuValue})`};
            }
            else {
                return { status: "recommended", message: `Ваш процессор Intel (${cpuValue})`};
            } 
        } else if(cpuValue?.split(' ')[0]?.toLowerCase() === 'amd'){
            const cpuMinAmd = cpuMin.find(cpu => cpu.toLowerCase().includes('amd'));
            const cpuRecommendedAmd = cpuRecommended.find(cpu => cpu.toLowerCase().includes('amd'));
        
            if (!cpuMinAmd || !cpuRecommendedAmd)  return { status: "unknown", message: "Данные о минимальных или рекомендованных требованиях отсутствуют" };
        
            const cpuTypeInputAmd = parseInt(cpuValue.split(' ')[2], 10);
            const cpuTypeMinAmd = parseInt(cpuMinAmd.split(' ')[2], 10);
            const cpuTypeRecommendedAmd = parseInt(cpuRecommendedAmd.split(' ')[2], 10);

        
            const cpuModelInput = parseInt(cpuValue.split(' ')[3], 10);
            const cpuModelMinAmd = parseInt(cpuMinAmd.split(' ')[3], 10);  
            const cpuModelRecommendedAmd = parseInt(cpuRecommendedAmd.split(' ')[3], 10);
        
            if (cpuTypeInputAmd < cpuTypeMinAmd || (cpuTypeInputAmd === cpuTypeMinAmd && cpuModelInput < cpuModelMinAmd)) {
                return { status: "bad", message: `Вашего процессора AMD (${cpuValue})`};
            } 
            else if (cpuTypeInputAmd < cpuTypeRecommendedAmd || (cpuTypeInputAmd === cpuTypeRecommendedAmd && cpuModelInput < cpuModelRecommendedAmd)) {
                return { status: "minimum", message: `Ваш процессор AMD (${cpuValue})`};
            } 
            else {
                return { status: "recommended", message: `Ваш процессор AMD (${cpuValue}) `};
            }
        } else {
            return { status: "unknown", message: "Не удалось определить процессор" };
        }
    }
    const checkPcGpu = () => {
        const currentGame = gamesMonthly[slide]?.node;
        const gpuMin = currentGame?.MinimumSystemRequirments?.GPU || [];
        const gpuRecommended = currentGame?.RecommendedSystemRequirments?.GPU || [];

        const gpuModelInput = parseInt(RegExp(/\d+/).exec(gpuValue)?.[0], 10);

        if(gpuValue?.split(' ')[0]?.toLowerCase() === 'nvidia') {
            const gpuMinNvidia =  gpuMin.find(gpu => gpu.toLowerCase().includes('nvidia'));
            const gpuRecommendedNvidia =  gpuRecommended.find(gpu => gpu.toLowerCase().includes('nvidia'));

            if (!gpuMinNvidia || !gpuRecommendedNvidia)  return { status: "unknown", message: "Данные о минимальных или рекомендованных требованиях отсутствуют" };

            const gpuModelMinNvidia =  parseInt(gpuMinNvidia.match(/\d+/)?.[0], 10);
            const gpuModelRecommendedNvidia =  parseInt(gpuRecommendedNvidia.match(/\d+/)?.[0], 10);
            if (gpuModelInput >= 2000 && gpuModelInput < 3000) {
                return { status: "aboveRecommended", message: `Ваша видеокарта Nvidia ${gpuValue}) `};                
            } else if(gpuModelInput < gpuModelMinNvidia){
                return { status: "bad", message: `Ваша видеокарта Nvidia (модель ${gpuValue})`};
            } else if (gpuModelInput >= gpuModelMinNvidia && gpuModelInput < gpuModelRecommendedNvidia ){
                return { status: "minimum", message: `Ваша видеокарта Nvidia (модель ${gpuValue})` };
            } else if (gpuModelInput >= gpuModelRecommendedNvidia) {
                return { status: "recommended", message: `Ваша видеокарта Nvidia (модель ${gpuValue})`};
            }
        } else if (gpuValue?.split(' ')[0]?.toLowerCase()  === 'amd'){
            const gpuMinAmd =  gpuMin.find(gpu => gpu.toLowerCase().includes('amd'));
            const gpuRecommendedAmd =  gpuRecommended.find(gpu => gpu.toLowerCase().includes('amd'));
    
            if (!gpuMinAmd || !gpuRecommendedAmd)  return { status: "unknown", message: "Данные о минимальных или рекомендованных требованиях отсутствуют" };

            const gpuModelMinAmd =  parseInt(gpuMinAmd.match(/\d+/)?.[0], 10);
            const gpuModelRecommendedAmd =  parseInt(gpuRecommendedAmd.match(/\d+/)?.[0], 10);
            if(gpuModelInput < gpuModelMinAmd){
                return { status: "bad", message: `Ваша видеокарта AMD (модель ${gpuValue})`};
            } else if (gpuModelInput >= gpuModelMinAmd && gpuModelInput < gpuModelRecommendedAmd ){
                return { status: "bad", message: `Ваша видеокарта AMD (модель ${gpuValue})`};
            } else if (gpuModelInput >= gpuModelRecommendedAmd) {
                return { status: "recommended", message: `Ваша видеокарта AMD (модель ${gpuValue})`};
            }
        }
        else if (gpuValue?.split(' ')[0]?.toLowerCase()  === 'intel'){
            const gpuRecommendedIntel =  gpuRecommended.find(gpu => gpu.toLowerCase().includes('intel'));
    
            if (!gpuRecommendedIntel)  return { status: "unknown", message: "Данные о минимальных или рекомендованных требованиях отсутствуют" };

            const gpuModelRecommendedIntel=  parseInt(gpuRecommendedIntel.match(/\d+/)?.[0], 10);
            if(gpuModelInput < gpuModelRecommendedIntel){
                return { status: "Norecommended", message:  `Ваша видеокарта Intel (модель ${gpuValue})`};
            } else if (gpuModelInput >= gpuModelRecommendedIntel) {
                return { status: "recommended", message: `Ваша видеокарта Intel (модель ${gpuValue})`};
            }
            }
         else{
            return { status: "unknown", message: "Не удалось определить видеокарту" };
        }
    }
    const handelCheckPc = () => {
        const isRamValid = isValidRamInput.test(ramValue) && ramValue.trim() !== '';
        const isGpuValid = isValidGPUInput.test(gpuValue) && gpuValue.trim() !== '';
        const isCpuValid = isValidCPUInput.test(cpuValue) && cpuValue.trim() !== '';
        
        setIsFormValid(!(isRamValid && isGpuValid && isCpuValid));
        if(isRamValid && isGpuValid && isCpuValid) {
            setModalCheckPc(true);
            onPcCheckResults({
                ram: checkPcRam(),
                gpu: checkPcGpu(),
                cpu: checkPcCpu(),
                status: {
                    ram: checkPcRam().status,
                    gpu: checkPcGpu().status,
                    cpu: checkPcCpu().status,
                }
            });
        } else {
            return null;
        }
    };
    return <div className="flex gap-9 justify-between max-md:w-[382px] max-phone:!w-full max-md:items-center w-full max-md:gap-6 max-md:flex-col">
        <div className="h-full flex-1 w-full">
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
        <div className="h-full flex-1 w-full">
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
        <div className="h-full bg-[#181724] rounded-xl flex-1 w-full" >
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
}
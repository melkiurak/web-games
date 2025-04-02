import { useEffect, useState } from "react";
import { Filters } from "./Filters/Filters";
export const GameFilter = ({dataGames}) => {
    const [gamesCount, setGamesCount] = useState(10);
    const handleGameCount = () => {
        if(window.innerWidth <= 768){
            setGamesCount(4);
        } else{
            setGamesCount(10);
        };
    }
    useEffect(() => {
        handleGameCount();
        window.addEventListener('resize', handleGameCount);

        return () => {
            window.removeEventListener('resize', handleGameCount);
        };
    }, [])
    return <div>
        <div className="container flex flex-col gap-8 px-6">
            <div className="flex flex-col text-center">
                <h2 className="text-white">Games By Filter</h2>
                <p className="text-[#979797]">At This Section You Can Search For Games by multiple filters</p>
            </div>
            <Filters dataGames={dataGames}/>
            <div className="grid grid-cols-2">
                {dataGames?.games?.edges.slice(0, gamesCount).map((edge => 
                    <div key={edge.node.objectId} className="">
                            <div className="w-[140px] max-md:w-full h-full max-md:h-[194px] bg-center max-md:bg-[center_top_-3rem] max-phone:!bg-center bg-cover bg-no-repeat rounded-lg" style={{backgroundImage: `url('${edge.node.BannerImg.url}')`}}></div>
                        <div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}
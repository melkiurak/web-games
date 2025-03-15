import { useQuery } from "@apollo/client";
import React from "react";
import { GET_CATEGORY } from "../../Service/gamedata";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export const Category = () => {
    const { data } = useQuery(GET_CATEGORY);
    const imageGroup = [
        data?.categoryGames.edges.slice(0, 3),
        data?.categoryGames.edges.slice(3, 6),
    ];

    return (
        <div className="mt-[46px] h-[527px] max-lg:pl-6">
            <div className="flex flex-col justify-between h-full container">
                <div className="flex justify-between items-center w-full h-[51px]">
                    <h2 className="text-white text-2xl max-lg:text-xl font-bold max-lg:font-semibold">Game Categories</h2>
                    <div className=" h-full">
                        <div className="flex gap-2">
                            <button className="rounded-[8px] p-[16.5px] max-lg:p-3 border border-solid border-[#979797]"><GrLinkPrevious/></button>
                            <button className="rounded-[8px] p-[16.5px] max-lg:p-3 border border-solid border-[#979797]"><GrLinkNext /></button>
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 max-desktop:gap-5 w-full justify-between max-lg:whitespace-nowrap max-md::whitespace-nowrap max-lg:overflow-x-auto overflow-hidden scrollbar-none">
                    {imageGroup.map((group, index) => (
                        <div key={index} className={`flex w-full max-lg:w-auto max-lg:flex-row-reverse gap-6 max-desktop:gap-5 max-lg:gap-3  ${index === 0 ? 'lg:flex-col-reverse' : ' flex-col'}`}>
                            <div className="flex justify-between w-full max-lg:w-auto h-[210px] max-desktop:h-[177px] max-lg:gap-3">
                                {group?.map((edge) => (edge.node.type === 'small' && (
                                    <div key={edge.node.objectId} className="flex flex-col justify-end cursor-pointer rounded-lg w-[282px] max-desktop:w-[206px] h-full max-desktop:bg-bottom bg-cover pb-5 pl-4"  style={{ backgroundImage: `url('${edge.node.img.url}')` }}>
                                        <h3 className="text-xl font-semibold text-white">{edge.node.name}</h3>
                                    </div>
                                    )
                                ))}
                            </div>
                            <div className="w-full max-lg:w-auto h-[210px] max-desktop:h-[177px] max-lg:gap-3">
                                {group?.map((edge) => (edge.node.type !== 'small' && (
                                    <div key={edge.node.objectId}  className="flex flex-col justify-end cursor-pointer rounded-lg w-full max-lg:w-[280px] h-full max-lg:bg-center bg-cover pb-5 pl-4" style={{ backgroundImage: `url('${edge.node.img.url}')` }}>
                                        <h3 className="text-xl font-semibold text-white">{edge.node.name}</h3>
                                    </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
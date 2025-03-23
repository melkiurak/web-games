import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_CATEGORY } from "../../Service/gamedata";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const Category = ({dataGames}) => {
    const { data} = useQuery(GET_CATEGORY);
    const [slide, setSlide] = useState(0);
    const splilCategorys = (data = []) => {
        const chunkedCategories = [];
        for(let i = 0; i < data.length; i +=6) {
            const chunkCategorys = data.slice(i, i + 6);
            const groups = [];

            for(let j = 0; j < chunkCategorys.length; j +=3 ){
                const group = chunkCategorys.slice(j, j + 3);
                groups.push(group);
            }
            chunkedCategories.push(groups )
        }
        return chunkedCategories;
    }
    const buttonNext = () => {
        if(slide < splilCategorys(data?.categoryGames.edges).length - 1){
            setSlide(slide + 1)
        }
    }
    const buttonPrev = () => {
        if(slide > 0){
            setSlide(slide - 1)
        }
    }
    const handleGamesCategorys = (name) => {
        const categoryGames = dataGames?.games?.edges?.filter(edge => name === edge?.node.category.name );
        if(categoryGames.length === 0) {
            console.log('Нет игр этой категории')
        } else {
            console.log(`Вот список игр ${categoryGames.length}`, categoryGames)
        }
    };
    
     return (
        <div className="mt-[46px] h-[527px] max-desktop:h-[449px] max-lg:h-[254px] max-lg:pl-6">
            <div className="flex flex-col justify-between h-full container">
                <div className="flex justify-between items-center w-full h-[51px]">
                    <h2>Game Categories</h2>
                    <div className=" h-full flex flex-col gap-2 max-lg:hidden">
                        {data?.categoryGames.edges && (
                            <div className="flex gap-2">
                                <button className="rounded-[8px] p-[7px] max-lg:p-3 border border-solid border-[#979797]" style={{border: slide > 0 ? '1px solid #FFFFFF' : '1px solid #979797', cursor:  slide > 0 ? "pointer" : 'auto'}} onClick={buttonPrev}><GrLinkPrevious style={{color: slide > 0 ? '#FFFFFF' : '#979797'}} /></button>
                                <button className={`rounded-[8px] p-[7px] max-lg:p-3 border border-solid border-[#979797] ${slide < splilCategorys(data?.categoryGames.edges).length - 1 ? 'cursor-pointer' : 'cursor-auto'}`} style={{border: slide < splilCategorys(data?.categoryGames.edges).length - 1  ? '1px solid #FFFFFF' : '1px solid #979797'}} onClick={buttonNext} ><GrLinkNext style={{color: slide < data?.categoryGames.edges.length - 1 ? '#FFFFFF' : '#979797'}} /></button>
                            </div>
                        )}
                        <div className=" max-w-[72px] w-full h-[12px] flex justify-between items-center">
                            {splilCategorys(data?.categoryGames.edges).map((_, index) => 
                                <div key={index} className={`w-[20px] h-2 bg-[#452154] rounded-3xl ${slide === index ? 'w-[38px] bg-[#FF5733] h-full' : ''}`}></div>
                            )}
                        </div>
                    </div>
                    <div className="hidden max-lg:flex items-center justify-center h-full w-[102px]">
                        <span className="text-[#FF5733] text-sm font-light">View All</span>
                        <MdOutlineKeyboardArrowRight className="text-[#FF5733] text-3xl"/>
                    </div>
                </div>
                <div className="flex gap-6 max-desktop:gap-5 w-full justify-between max-lg:whitespace-nowrap max-md:whitespace-nowrap max-lg:overflow-x-auto scrollbar-none">
                    {splilCategorys(data?.categoryGames.edges).length > 0 && (
                        <>
                            {splilCategorys(data?.categoryGames.edges)[slide]?.map((group, groupIndex) => (
                                <div key={groupIndex} className={`flex w-full max-lg:w-auto max-lg:flex-row-reverse gap-6 max-desktop:gap-5 max-lg:gap-3  ${groupIndex === 0 ? 'lg:flex-col-reverse' : 'flex-col'}`}>
                                    <div className="flex justify-between w-full max-lg:w-auto h-[210px] max-desktop:h-[177px] max-lg:gap-3" >
                                        {group?.map((edge) => (edge.node.type === 'small' && (
                                            <button key={edge.node.objectId} className="shadow-categorys  relative flex flex-col items-start justify-end rounded-lg w-[282px] max-desktop:w-[206px] h-full max-desktop:bg-bottom bg-cover pb-5 pl-4 after:content-[''] after:cursor-pointer after:absolute after:w-full after:top-0 after:left-0  after:h-full  after:bg-black/30 after:rounded-lg" style={{ backgroundImage: `url('${edge.node.img.url}')`}} onClick={() => handleGamesCategorys(edge.node.name)} >
                                                <h3 className="text-xl font-semibold text-white z-10">{edge.node.name}</h3>
                                            </button>
                                        )))}
                                    </div>
                                    <div className="w-full max-lg:w-auto h-[210px] max-desktop:h-[177px] max-lg:gap-3">
                                        {group?.map((edge) => (edge.node.type !== 'small' && (
                                            <button key={edge.node.objectId} className="shadow-categorys  relative flex flex-col items-start justify-end rounded-lg w-full max-lg:w-[280px] h-full max-lg:bg-center bg-cover pb-5 pl-4 after:content-[''] after:cursor-pointer after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/30 after:rounded-lg" style={{ backgroundImage: `url('${edge.node.img.url}')` }} onClick={() => handleGamesCategorys(edge.node.name)}>
                                                <h3 className="text-xl font-semibold text-white z-10">{edge.node.name}</h3>
                                            </button>
                                        )))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
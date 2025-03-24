import React from 'react';
import  controller from '../../assets/Header/controller.png';
import  gamingLogo from '../../assets/Header/gamingLogo.png';
import  prime from '../../assets/Header/Prime.png';
import search from '../../assets/Header/search.png'
export const  Header = () => {
    return (
        <header className='absolute w-full bg-transparent backdrop-blur-xs z-[10] h-[90px] max-desktop:h-[83px] max-md:h-[64px] flex items-center justify-center max-lg:px-3'>
            <div className='flex items-center justify-between w-full container h-full max-lg:pl-[10px]'> 
                <div className='max-lg:flex-[1] max-md:h-10'>
                    <div className='flex items-center gap-[3.5px] flex-none pr-5'>
                        <img src={controller} alt="controller"  /> 
                        <img src={prime} alt="prime"  />
                    </div>
                    <img src={gamingLogo} alt="gamingLogo"/>
                </div>
                <button className='w-11 max-lg:w-9 h-11 max-lg:h-9 rounded-[30px] bg-[#FF5733] max-lg:mr-5'> 
                    <img src={search} alt="search" className='p-3 max-lg:p-2'/> 
                </button>
                <nav className='flex-1 pl-[20px] pr-[10.5px] max-desktop:w-[500px] max-lg:hidden'>
                    <ul className=' w-full flex justify-around items-center'>
                        <li><a href="/" className='text-white text-[15px] font-medium max-lg:text-sm'>Home</a></li>
                        <li><a href="/news" className='text-white text-[15px] font-medium max-lg:text-sm'>News</a></li>
                        <li><a href="/store" className='text-white text-[15px] font-medium max-lg:text-sm'>Store</a></li>
                        <li><a href="/review" className='text-white text-[15px] font-medium max-lg:text-sm'>Review</a></li>
                        <li><a href="/guide" className='text-white text-[15px] font-medium max-lg:text-sm'>Guide</a></li>
                        <li><a href="/about" className='text-white text-[15px] font-medium max-lg:text-sm'>About Us</a></li>
                    </ul>
                </nav>
                <div className='flex max-lg:flex-[1] flex-none max-w-[208px] w-full justify-between h-[40px] gap-4 max-lg:mr-5 max-md:hidden'>
                    <button className='opaqueButton rounded-2xl'> 
                        <span className='px-[24px] py-[7.5px]'>Sign Up</span>
                    </button>
                    <button className='transparentButton rounded-2xl'> 
                        <span className='px-[24px] py-[7.5px]'>Login</span> 
                    </button>
                </div>
                <div className='hidden max-lg:block w-[36px] h-[36px] relative z-[2] overflow-hidden'>
                    <button>
                        <span className=' w-full h-[2px] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF5733] transition-all duration-500'></span>
                        <span className=' w-full h-[2px] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF5733] transition-all duration-500' style={{ top: "calc(50% - 5px)" }}></span>
                        <span className=' w-full h-[2px] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF5733] transition-all duration-500' style={{ top: "calc(50% + 5px)" }}></span>
                    </button>
                </div>
            </div>
        </header>
    )
}

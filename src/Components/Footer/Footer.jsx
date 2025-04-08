import  controller from '../../assets/Header/controller.png';
import  gamingLogo from '../../assets/Header/gamingLogo.png';
import  prime from '../../assets/Header/Prime.png';
import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";

export const Footer = () => {
    return <footer className='bg-[#171621]  h-[366.5px] max-lg:h-full px-6 pt-8'>
        <div className="container flex items-center h-full">
            <div className='flex max-lg:flex-col items-baseline max-lg:items-center gap-3'>
                <div className="flex flex-col gap-6 flex-1">
                    <div className='flex gap-6 items-center'>
                        <div className=''>
                            <div className='flex items-center gap-[3.5px] flex-none pr-5'>
                                <img src={controller} alt="controller"  /> 
                                <img src={prime} alt="prime"  />
                            </div>
                            <img src={gamingLogo} alt="gamingLogo"/>
                        </div>
                        <p className="text-white">Unleash your gaming potential with Prime Gaming</p>
                    </div>
                    <p className='text-[#888888]'>Step into the future of gaming with Prime Gaming. Explore top-tier reviews, news, and in-depth analysis on the latest and greatest games. Join the gaming community now to get exclusive content and features.</p>
                    <div className='flex text-white text-2xl justify-between'>
                        <IoLogoFacebook/>
                        <FaInstagram/>
                        <FaXTwitter/>
                        <CiYoutube/>
                    </div>
                </div>
                <div className='flex flex-1'>
                    <div className='flex flex-col items-center gap-9 flex-1'>
                        <h3 className='!text-[#FF5733]'>Explore</h3>
                        <ul className='flex flex-col gap-6'>
                            <li className='text-[#888888] text-sm font-medium text-center'>Trending games</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>Upcoming releases</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>reviews</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>news</li>
                        </ul>
                    </div>
                    <div className='flex flex-col items-center gap-9 flex-1'>
                        <h3 className='!text-[#FF5733]'>Resources</h3>
                        <ul className='flex flex-col gap-6'>
                            <li className='text-[#888888] text-sm font-medium text-center'>FAQ</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>Tutorials</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>Community Firum</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>Membership</li>
                        </ul>
                    </div>
                    <div className='flex flex-col items-center gap-9 flex-1'>
                        <h3 className='!text-[#FF5733]'>Programs</h3>
                        <ul className='flex flex-col gap-6'>
                            <li className='text-[#888888] text-sm font-medium text-center'>Game Of The Month</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>Game Of The Year</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>Developer Spotlight</li>
                            <li className='text-[#888888] text-sm font-medium text-center'>Beta Access</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col gap-9'>
                    <h3 className='!text-[#B53E24]'>Contact Us</h3>
                    <ul className='flex flex-col gap-6'>
                        <li className='flex gap-1'>
                            <IoLocationOutline className='text-white text-2xl'/>
                            <span className='text-[#888888] text-sm'>usa - Washngton DC</span>
                        </li>
                        <li className='flex gap-1'>
                            <LuPhone className='text-white text-2xl'/>
                            <span className='text-[#888888] text-sm'>1234-56789</span>
                        </li>
                        <li className='flex gap-1'>
                            <MdOutlineEmail className='text-white text-2xl'/>
                            <span className='text-[#888888] text-sm'>PrimeGmain@Gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
}
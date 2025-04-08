import { FiUser } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import GoogleIcon from '../../assets/main/devicon_google.png'
export const Auth = () => {
    return <div className="max-lg:px-5">
        <div className="container flex max-lg:flex-col gap-6">
            <div className="flex flex-col justify-between gap-4 flex-1 ">
                <h2>Unlock the Ultimate <span className="text-[#FF5733]">Gaming Experience</span></h2>
                <p className="text-sm text-white">Sign up now to dive into exclusive content, track your progress, and connect with a global community of gamers. Don’t miss out on special offers made just for you!</p>
                <div className="grid max-sm:flex max-sm:flex-col grid-cols-2 gap-6">
                    <div className="bg-[#181724] rounded-xl text-white shadow-categorys">
                       <div className="flex flex-col items-center p-3  gap-2">
                            <h4 className="font-medium max-desktop:!text-sm">Access <span className="text-[#FF5733]">Exclusive Games</span></h4>
                            <p className="text-xs">Get early access to new releases and hidden gems, only for registered members. Be the first to play!</p>
                       </div>
                    </div>
                    <div className="bg-[#181724] rounded-xl  text-white shadow-categorys">
                       <div className="flex flex-col items-center p-3 gap-2">
                            <h4 className="font-medium max-desktop:!text-sm">Track <span className="text-[#FF5733]">Stats</span> & <span className="text-[#FF5733]">Achievements</span></h4>
                            <p className="text-xs">Monitor gameplay stats, track achievements, and share your progress with fellow gamers easily</p>
                       </div>
                    </div>
                    <div className="bg-[#181724] rounded-xl  text-white shadow-categorys">
                       <div className="flex flex-col items-center p-3 gap-2">
                            <h4 className="font-medium max-desktop:!text-sm">Join Our <span className="text-[#FF5733]">Community</span></h4>
                            <p className="text-xs">Connect with a passionate community of gamers. Share tips, strategies, and gaming experiences</p>
                       </div>
                    </div>
                    <div className="bg-[#181724] rounded-xl  text-white shadow-categorys">
                       <div className="flex flex-col items-center p-3 gap-2">
                            <h4 className="font-medium max-desktop:!text-sm">Exclusive <span className="text-[#FF5733]">Discounts</span> & <span className="text-[#FF5733]">Offers</span></h4>
                            <p className="text-xs">Enjoy member-only discounts on top-rated games, DLCs, and in-game items. Save on your favorites!</p>
                       </div>
                    </div>
                </div>
            </div>
            <div className=" bg-[#181724] rounded-xl flex-1">
               <div className="px-6 py-4 w-full flex flex-col gap-4 justify-between">
                 <div className="flex flex-col gap-2 items-center w-full">
                    <div className="flex gap-4">
                         <button>Sign Up</button>
                         <button>Login</button>
                    </div>
                    <div className="flex flex-col gap-2 w-full text-white">
                        <label htmlFor="">Name</label>
                        <div className="w-full relative h-10">
                            <input type="text" className="w-full h-full border border-white rounded-sm" />
                            <div className="absolute top-2 left-2 flex gap-1 items-center ">
                            <FiUser className="text-2xl"/>
                            <span className="text-[10px]">Enter Your Name</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full text-white">
                        <label htmlFor="">E-Mail</label>
                        <div className="w-full relative h-10">
                            <input type="text" className="w-full h-full border border-white rounded-sm" />
                            <div className="absolute top-2 left-2 flex gap-1 items-center ">
                                <GoMail className="text-2xl"/>
                                <span className="text-[10px]">Enter Your Name</span>
                            </div>
                        </div>
                    </div>
                 </div>
                 <div className="flex gap-2 flex-col ">
                    <button className="w-full opaqueButton py-2 rounded-3xl">Sign Up</button>
                    <p className="flex items-center text-center text-white gap-4">
                        <span className="flex-grow border-t border-white"></span>
                        Or
                        <span className="flex-grow border-t border-white"></span>
                    </p>
                    <button className="flex items-center justify-center w-full gap-1.5 border border-white rounded-2xl py-2 text-white">
                        <img src={GoogleIcon} alt="" />
                        <span>Sign Up With Google</span>
                    </button>
                 </div>
               </div>
            </div>
        </div>
    </div>
}
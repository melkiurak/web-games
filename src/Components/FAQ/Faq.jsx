import { IoIosArrowDown } from "react-icons/io";


export const Faq = () => {
    return <div className="max-lg:px-6">
        <div className="container flex flex-col gap-8 items-center">
            <h2>FAQ</h2>
            <div className="flex flex-col gap-6 w-full">
                <button className="w-full border border-[#6B2515] bg-[#181724] flex items-center justify-between px-6 max-lg:px-3 h-[64px] max-lg:h-[56px] rounded-lg">
                    <h3 className="max-lg:!text-base">What services does Prime Gaming offer?</h3>
                    <IoIosArrowDown className="text-[#6B2515] text-3xl"/>
                </button>
                <button className="w-full border border-[#6B2515] bg-[#181724] flex items-center justify-between px-6 max-lg:px-3 h-[64px] max-lg:h-[56px] rounded-lg">
                    <h3 className="max-lg:!text-base">Do I need an account to use the site?</h3>
                    <IoIosArrowDown className="text-[#6B2515] text-3xl"/>
                </button>
                <button className="w-full border border-[#6B2515] bg-[#181724] flex items-center justify-between px-6 max-lg:px-3 h-[64px] max-lg:h-[56px] rounded-lg">
                    <h3 className="max-lg:!text-base">Are there any subscription fees?</h3>
                    <IoIosArrowDown className="text-[#6B2515] text-3xl"/>
                </button>
                <button className="w-full border border-[#6B2515] bg-[#181724] flex items-center justify-between px-6 max-lg:px-3 h-[64px] max-lg:h-[56px] rounded-lg">
                    <h3 className="max-lg:!text-base">How can I contact support?</h3>
                    <IoIosArrowDown className="text-[#6B2515] text-3xl"/>
                </button>
            </div>
        </div>
    </div>
}
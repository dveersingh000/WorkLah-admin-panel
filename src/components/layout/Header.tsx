import React from "react";
import { Bell, ChevronLeft, Search, User } from "lucide-react";
import { FaCaretLeft } from "react-icons/fa";

const Header = () => {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 ">
      <div className="flex items-center flex-1">
        <div className="flex items-center gap-4 w-96 px-6 py-4 rounded-full border border-[#a3a3a3] ">
            <Search className="w-7 h-7" color="#4c4c4c" />
          <input
            type="search"
            placeholder="Search jobs, employers, outlets, etc."
            className="w-full focus:outline-none text-[16px] leading-[20px] text-[#4c4c4c]"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <Bell className="w-7 h-7 cursor-pointer" color="#000000" />
        <FaCaretLeft className="w-4 h-4" /> 

        <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
               <h1 className="text-[30px] leading-[30px] text-[#000000] font-medium">Hi, Steve</h1>
               <p className="text-[14px] leading-[24px] text-[#4c4c4c] font-medium">Good Morning!</p>
            </div>
            <img src="/assets/profile.svg" alt="profile pic" className="w-16 h-16 bg-gray-200 rounded-full" />
          
         
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client"
import { TiVendorApple } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { VscTasklist } from "react-icons/vsc";
import { IoPersonOutline } from "react-icons/io5";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { CgMoveLeft } from "react-icons/cg";
import { useState } from "react";
import  Link  from "next/link";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
  openCommandBar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar, openCommandBar }) => {
  return (
    <>
    <div className={`h-screen bg-black fixed top-0 ${open ? 'translate-x-0 w-[20%]' : '-translate-x-full w-0'} transition-transform duration-300`}>
      <div className={`w-full ${open ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col py-5 ">
          <li className="flex flex-row justify-between text-gray-100 items-center mb-10 px-4 cursor-pointer">
            <div className="flex items-center flex-row justify-start">
              <TiVendorApple className="me-2" />
              <h1>CRM</h1>
            </div>
            <CgMoveLeft onClick={toggleSidebar} className="text-xl cursor-pointer" />
          </li>
          <li className="flex flex-row justify-between  hover:bg-gray-900  text-gray-100 items-center px-4 cursor-pointer">
          <div className="flex items-center flex-row justify-start">
                                {/* Example sidebar option that opens the command bar */}
                                <div onClick={() => {  openCommandBar(); }} className="flex flex-row items-center"> <IoIosSearch className="me-3" />
                                    <h1>Search</h1></div>
                            </div>
            <h1>Ctrl + k</h1>
          </li>
          <li className="flex flex-row justify-start text-gray-100 hover:bg-gray-900 items-center px-4 cursor-pointer">
            <CiSettings className="me-3" />
            <h1>Settings</h1>
          </li>
          <li className="flex flex-row justify-start text-gray-100 hover:bg-gray-900 items-center mb-3 px-4 cursor-pointer">
            <VscTasklist className="me-3" />
            <h1>Task</h1>
          </li>
          <li className="text-gray-500 mb-3">Workspace</li>
          <Link href='/People' className="cursor-pointer">
            <li className="flex flex-row justify-start text-gray-100 hover:bg-gray-900 items-center cursor-pointer px-4 ">
              <IoPersonOutline className="me-3" />
              <h1>People</h1>
            </li>
          </Link>
          <li className="flex flex-row justify-start text-gray-100 hover:bg-gray-900 items-center px-4 cursor-pointer">
            <TbBuildingSkyscraper className="me-3" />
            <h1>Companies</h1>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Sidebar

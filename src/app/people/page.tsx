"use client"
import Sidebar from '@/components/Sidebar'
import React,{useState} from 'react'
import { CgMoveRight } from "react-icons/cg";
import Table from '@/components/Table';
import CommandBar from '@/components/CommandBar';


const People: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [commandBarOpen, setCommandBarOpen] = useState(false); 

  const toggleSidebar = () => {
      setOpen(!open);
  };

  const openCommandBar = () => {
      setCommandBarOpen(true);
  };
  
    return (
      <>
      <div className='relative'>
      <div className="flex">
        <Sidebar open={open} toggleSidebar={toggleSidebar} openCommandBar={openCommandBar} />
        <div className={`relative transition-all bg-gray-800 duration-300 ${open ? 'ml-[20%]' : 'ml-0'}`}>
          <CgMoveRight onClick={toggleSidebar} className={`relative ${open ? "hidden": "block"} mt-10 ms-8 cursor-pointer top-0 left-0    text-white text-xl`}/>
          <div className='relative'>
          <h1 className="text-2xl bg-gray-800 px-7 py-7 text-white font-bold ">People</h1>
          <Table />
          </div>
         
        </div>
      </div>
      <CommandBar />
      </div>
      </>
    );
  };

export default People

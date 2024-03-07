'use client';

import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Loader from '../Loader';
import Home from './Home';
import Quiz from './Quiz';
import GenerateQuiz from './GenerateQuiz';
import History from './History';
import SignOutDashboard from './SignOutDashboard';
import { useSession } from 'next-auth/react';

function MyDashboard() {
    const {data} = useSession()
    const [open, setOpen] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState('Home');

    const Menus = [
        { title: "Home", icon: AiOutlineHome },
        { title: "Quiz", icon: AiOutlineEdit, gap: true },
        { title: "Generate Quiz", icon: AiOutlinePlusCircle },
        { title: "History", icon: AiOutlineHistory, gap: true },
    ];

    const handleMenuClick = (title: any) => {
        setSelectedMenu(title);
    }

    const renderContent = () => {
        switch (selectedMenu) {
            case 'Home':
                return <Home />;
            case 'Quiz':
                return <Quiz />;
            case 'Generate Quiz':
                return <GenerateQuiz />;
            case 'History':
                return <History />;
            default:
                return null;
        }
    };

    return (<>
        {!data && <Loader/>}
        {data && <div className="flex h-screen">
            <div
                className={` ${open ? "w-72" : "w-20"} bg-gray-900 h-screen p-5  pt-5 relative duration-300`}
            >
                <IoIosArrowBack
                    className={`absolute cursor-pointer bg-white -right-2 top-8 text-gray-900 w-5 h-5 border-gray-900 border-2 rounded-full ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)} />
                <Link className="flex gap-x-2 lg:gap-x-4 items-center" href={'/'}>
                    <img src="/logo.png" height={50} width={50}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <div className={`font-bold text-white mx-0 md:mx-2 lg-mx-2 duration-200 text-base md:text-lg lg:text-xl ${!open && "scale-0"}`}>QuizBee</div>
                </Link>

                {/* Menu items */}
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex p-2 cursor-pointer rounded hover:bg-gray-800 text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? 'mt-9' : 'mt-2'} ${Menu.title === selectedMenu ? 'bg-gray-800' : ''}`}
                            onClick={() => handleMenuClick(Menu.title)}
                        >
                            <Menu.icon className='h-6 w-6' />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                    <li><SignOutDashboard myBool={open} /></li>
                </ul>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>}
    </>
    )
}

export default MyDashboard
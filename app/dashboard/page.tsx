"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  AiOutlineHome,
  AiOutlineLineChart,
  AiOutlineUser,
} from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Home from "../components/dashboardComponents/Home";
import Quiz from "../components/dashboardComponents/Quiz";
import GenerateQuiz from "../components/dashboardComponents/GenerateQuiz";
import History from "../components/dashboardComponents/History";
import Alluser from "../components/dashboardComponents/Alluser";
import AdminHome from "../components/dashboardComponents/AdminHome";
import Analysis from "../components/dashboardComponents/Analysis";
import { getSession, signOut, useSession } from "next-auth/react";
import SignOutDashboard from "../components/dashboardComponents/SignOutDashboard";

function Dashboard() {
  const { data } = useSession();
  const [open, setOpen] = useState(true);

  const [selectedAdminMenu, setSelectedAdminMenu] = useState("Admin Home");
  const [selectedUserMenu, setSelectedUserMenu] = useState("Home");

  // : useState("Home");

  const Menuscustomer = [
    { title: "Home", icon: AiOutlineHome },
    { title: "Quiz", icon: AiOutlineEdit, gap: true },
    { title: "Generate Quiz", icon: AiOutlinePlusCircle },
    { title: "History", icon: AiOutlineHistory, gap: true },
  ];
  const Menusadmin = [
    { title: "Admin Home", icon: AiOutlineHome },
    { title: "User", icon: AiOutlineUser },
    { title: "Analysis", icon: AiOutlineLineChart, gap: true },
  ];
  const Menus = data?.user.isAdmin ? Menusadmin : Menuscustomer;

  const handleAdminMenuClick = (title: any) => {
    setSelectedAdminMenu(title);
  };
  const handleUserMenuClick = (title: any) => {
    setSelectedUserMenu(title);
  };

  const renderAdminContent = () => {
    switch (selectedAdminMenu) {
      case "User":
        return <Alluser />;
      case "Analysis":
        return <Analysis />;
      case "Admin Home":
        return <AdminHome />;
      case "Log Out":
        signOut({ callbackUrl: "/", redirect: true });
      default:
        return null;
    }
  };
  const renderUserContent = () => {
    switch (selectedUserMenu) {
      case "Home":
        return <Home />;
      case "Quiz":
        return <Quiz />;
      case "Generate Quiz":
        return <GenerateQuiz />;
      case "History":
        return <History />;
      case "Log Out":
        signOut({ callbackUrl: "/", redirect: true });
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20"
        } bg-gray-900 h-screen p-5  pt-5 relative duration-300`}
      >
        <IoIosArrowBack
          className={`absolute cursor-pointer bg-white -right-2 top-8 text-gray-900 w-5 h-5 border-gray-900 border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <Link className="flex gap-x-4 items-center" href={"/"}>
          <img
            src="/logo.png"
            height={50}
            width={50}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <div
            className={`font-bold text-white mx-2 duration-200 ${
              !open && "scale-0"
            }`}
          >
            QuizBee
          </div>
        </Link>

        {/* Menu items */}
        {data?.user.isAdmin && (
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex p-2 cursor-pointer rounded hover:bg-gray-800 text-gray-300 text-sm items-center gap-x-4 ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${Menu.title === selectedAdminMenu ? "bg-gray-800" : ""}`}
                onClick={() => handleAdminMenuClick(Menu.title)}
              >
                <Menu.icon className="h-6 w-6" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
            <li>
              <SignOutDashboard myBool={open} />
            </li>
          </ul>
        )}

        {!data?.user.isAdmin && (
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex p-2 cursor-pointer rounded hover:bg-gray-800 text-gray-300 text-sm items-center gap-x-4 ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${Menu.title === selectedUserMenu ? "bg-gray-800" : ""}`}
                onClick={() => handleUserMenuClick(Menu.title)}
              >
                <Menu.icon className="h-6 w-6" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
            <li>
              <SignOutDashboard myBool={open} />
            </li>
          </ul>
        )}
      </div>
      <div className="h-screen flex-1 p-7">
        {data?.user.isAdmin && (
          <>
            <h1 className="text-2xl mb-5 font-semibold ">
              {selectedAdminMenu} page
            </h1>
            {renderAdminContent()}
          </>
        )}
        {!data?.user.isAdmin && (
          <>
            <h1 className="text-2xl mb-5 font-semibold ">
              {selectedUserMenu} page
            </h1>
            {renderUserContent()}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

// <ul className="pt-6">
//                     {Menus.map((Menu, index) => (
//                         <li
//                             key={index}
//                             className={`flex p-2 cursor-pointer rounded hover:bg-gray-800 text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"
//                                 } ${Menu.title === selectedMenu ? "bg-gray-800" : ""}`}
//                             onClick={() => handleMenuClick(Menu.title)}
//                         >
//                             <Menu.icon className="h-6 w-6" />
//                             <span className={`${!open && "hidden"} origin-left duration-200`}>
//                                 {Menu.title}
//                             </span>
//                         </li>
//                     ))}
//                     <li>
//                         <SignOutDashboard myBool={open} />
//                     </li>
//                 </ul>

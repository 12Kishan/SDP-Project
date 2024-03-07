import { AiOutlineHome, AiOutlineEdit, AiOutlinePlusCircle, AiOutlineHistory, AiOutlineUser, AiOutlineAudit, AiOutlineLineChart } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

export const userMenus = [
    {
        title: "Home",
        icon: <AiOutlineHome className='h-5 w-5' />,
        gap: true,
        link: '/dashboard'
    },
    {
        title: "Quiz",
        icon: <AiOutlineEdit className='h-5 w-5' />,
        gap: true,
        link: '/dashboard/assess'
    },
    {
        title: "Generate Quiz",
        icon: <AiOutlinePlusCircle className='h-5 w-5' />,
        gap: false,
        link: '/dashboard/generate'
    },
    {
        title: "History",
        icon: <AiOutlineHistory className='h-5 w-5' />,
        gap: true,
        link: '/dashboard/history'
    },
];

export const adminMenus = [{
    title: "Home",
    icon: <AiOutlineHome className='h-5 w-5' />,
    gap: true,
    link: '/dashboard/adminHome'
},
{
    title: "Users",
        icon: <AiOutlineUser className='h-5 w-5' />,
        gap: true,
        link: '/dashboard/users'
},
{
    title: "Admins",
        icon: <RiAdminLine  className='h-5 w-5' />,
        gap: true,
        link: '/dashboard/admins'
},
{
    title: "Analysis",
        icon: <AiOutlineLineChart className='h-5 w-5' />,
        gap: true,
        link: '/dashboard/analysis'
},
];
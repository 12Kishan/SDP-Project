import { AiOutlineHome, AiOutlineEdit, AiOutlinePlusCircle, AiOutlineHistory } from "react-icons/ai";

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
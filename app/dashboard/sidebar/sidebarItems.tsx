import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userMenus } from './data';
import { useDashboardContext } from '../Provider';
import SignOutDashboard from '@/app/components/dashboardComponents/SignOutDashboard';
import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';

const style = {
    title: 'mx-4 text-sm whitespace-pre',
    active: 'bg-gray-700 rounded-full',
    link: 'flex items-center justify-start my-1 p-3 w-full hover:text-white',
    close: 'lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all',
    open: 'lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto',
};

export function SidebarItems() {
    const pathname = usePathname();
    const { isOpen } = useDashboardContext();

    return (
        <ul className="md:pl-3">
            {userMenus.map((item) => (
                <li key={item.title} className={`gap-y-2 ${item.gap?'mt-8':''}`}>
                    <Link href={item.link}>
                        <span className={`hover:bg-gray-700 mb-3 hover:rounded-md w-full text-sm whitespace-pre flex items-center ${item.link === pathname ? 'bg-gray-700 rounded-md' : ''}`}>
                            <div className={`p-2`}>
                                <span>{item.icon}</span>
                            </div>
                            <span className={`mx-4 text-xs md:text-base lg:text-base text-white  whitespace-pre ${isOpen ? 'lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto' : 'lg:duration-200 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all'}`}>
                                {item.title}
                                </span>
                        </span>
                    </Link>
                </li>
            ))}
            <li>
                <button className='hover:bg-gray-700 p-2 mt-8 mb-3 hover:rounded-md w-full text-sm whitespace-pre flex items-center' onClick={() => { signOut({ callbackUrl: '/', redirect: true }) }}>
                    <div className="">
                        <FiLogOut className='h-5 w-5' />
                    </div>
                    <span className={`mx-4 text-xs md:text-base lg:text-base text-white  whitespace-pre ${isOpen ? 'lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto' : 'lg:duration-200 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all'}`}>
                        Sign Out
                    </span>
                </button>
            </li>
        </ul>
    );
}
//lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all
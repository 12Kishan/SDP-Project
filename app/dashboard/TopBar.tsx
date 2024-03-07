'use client';
import { useDashboardContext } from './Provider';
import { RxHamburgerMenu } from "react-icons/rx";

type Prop = {
    title: string
}
export function TopBar({title='DEMOO'}:Prop) {
    const { openSidebar } = useDashboardContext();
    return (
        <header className="relative z-10 h-16 mt-3 items-center">
            <div className="relative z-10 mx-auto flex h-full flex-col justify-center px-3 text-white">
                <div className="relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
                    <div className="px-12 group relative flex h-full justify-left gap-x-8 w-full items-center">
                        <button
                            className='p-2 hover:bg-gray-700 hover:rounded-md'
                            type="button"
                            onClick={openSidebar}
                        >
                            <RxHamburgerMenu className='h-5 w-5'/>
                        </button>
                        <div className="text-3xl font-bold">{title}</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

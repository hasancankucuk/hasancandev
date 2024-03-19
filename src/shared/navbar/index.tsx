import { useState } from "react";
import { BeakerIcon, HomeIcon, RectangleStackIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [activeNavItem, setActiveNavItem] = useState<number | null>(1);

    const navItems = [
        { id: 1, text: 'Home', link: '/', icon: <HomeIcon className="h-8 w-8 my-5 text-white" />, tooltip: 'Home' },
        { id: 2, text: 'About', link: '/about', icon: <UserCircleIcon className="h-8 w-8 my-5 mx-1 text-white" />, tooltip: 'About' },
        { id: 3, text: 'Projects', link: '/projects', icon: <RectangleStackIcon className="h-8 w-8 my-5 mx-1 text-white" />, tooltip: 'Projects' },
    ];

    const handleNavItemClick = (itemId: number) => {
        setActiveNavItem(itemId);
    };
    return (
        <div className="max-w-[90%] md:max-w-[40%] bg-mainTheme my-2 mx-auto rounded-lg">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <div className="flex space-x-4">
                            {navItems.map((item: any) => (
                                <Link key={item.id} to={item.link} onClick={() => handleNavItemClick(item.id)}>
                                    <div className={`group cursor-pointer relative ${activeNavItem === item.id ? 'active' : ''}`}>
                                        {item.icon}
                                        <div className="text-white opacity-0 w-auto bg-black  text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 top-full transform -translate-x-1 pointer-events-none">
                                            {item.tooltip}
                                        </div>
                                        {activeNavItem === item.id && (
                                            <div className="bg-underLine h-0.5 w-full absolute -bottom-1 mt-1"></div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>


                    <div className="text-white absolute right-0">
                        <a href="https://read.cv/hasancankucuk" target="_blank" rel="noopener noreferrer">
                            <button className="bg-inlineTheme hover:bg-cardTheme  py-1 px-2 rounded-lg">
                                Read.cv
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

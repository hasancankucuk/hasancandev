import React, { useState } from "react";
import { HomeIcon, RectangleStackIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Tooltip } from "../tooltip/tooltip";

export default function Navbar() {
    const [activeNavItem, setActiveNavItem] = useState<number | null>(1);

    const navItems = [
        { id: 1, text: 'Home', link: '/', icon: <HomeIcon className="h-8 w-8 my-5 text-black dark:text-white" />, tooltip: 'Home' },
        { id: 2, text: 'About', link: '/about', icon: <UserCircleIcon className="h-8 w-8 my-5 mx-1 text-black dark:text-white" />, tooltip: 'About' },
        { id: 3, text: 'Projects', link: '/projects', icon: <RectangleStackIcon className="h-8 w-8 my-5 mx-1 text-black dark:text-white" />, tooltip: 'Projects' },
    ];

    const handleNavItemClick = (itemId: number) => {
        setActiveNavItem(itemId);
    };
    return (
        <div className="max-w-[90%] md:max-w-[40%] bg-light-MainTheme dark:bg-dark-MainTheme my-2 mx-auto rounded-lg">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <div className="flex space-x-4">
                            {navItems.map((item) => (
                                <Link key={item.id} to={item.link} onClick={() => handleNavItemClick(item.id)}>
                                    <div className={`group cursor-pointer relative ${activeNavItem === item.id ? 'active' : ''}`}>
                                        {item.icon}
                                        <Tooltip tooltipText={item.tooltip} />
                                        {activeNavItem === item.id && (
                                            <div className="bg-underLine h-0.5 w-full absolute -bottom-1 mt-1"></div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>


                    <div className="text-black dark:text-white absolute right-0">
                        <a href="https://read.cv/hasancankucuk" target="_blank" rel="noopener noreferrer">
                            <button className="bg-light-inlineTheme dark:bg-dark-inlineTheme hover:bg-light-cardTheme dark:hover:bg-dark-cardTheme  py-1 px-2 rounded-lg">
                                Read.cv
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

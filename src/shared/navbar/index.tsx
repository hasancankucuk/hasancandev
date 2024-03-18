"use client"

import { useState } from "react";
import Link from "next/link";
import { BeakerIcon, HomeIcon, RectangleStackIcon, UserCircleIcon } from "@heroicons/react/24/outline";

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
        <div className="max-sm:max-w-[90%] md:max-w-[40%] max-md:max-w-[90%] lg:max-w-[40%] bg-mainTheme my-2 mx-auto rounded-lg">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <div className="flex space-x-4">
                            {navItems.map((item: any) => (
                                <Link key={item.id} href={item.link} onClick={() => handleNavItemClick(item.id)}>
                                    <div className={`group cursor-pointer relative ${activeNavItem === item.id ? 'active' : ''}`}>
                                        {item.icon}
                                        <div className="opacity-0 w-auto bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 top-full transform -translate-x-1 pointer-events-none">
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


                    <div className="text-white absolute right-px">
                        <Link target="_blank" as={`https://read.cv/hasancankucuk`} href="https://read.cv/hasancankucuk">
                            <button className="bg-inlineTheme hover:bg-cardTheme text-white py-1 px-2 rounded-lg">
                                Read.cv
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
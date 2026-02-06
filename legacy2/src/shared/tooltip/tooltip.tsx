import React, { useEffect, useState } from "react";

interface TooltipProps {
    tooltipText: string
}

export const Tooltip = ({ tooltipText }: TooltipProps) => {
    const [isTouchScreen, setIsTouchScreen] = useState(false);

    useEffect(() => {
        const onTouchStart = () => {
            setIsTouchScreen(true);
        };
        window.addEventListener("touchstart", onTouchStart);
        return () => {
            window.removeEventListener("touchstart", onTouchStart);
        };
    }, []);

    return (
        <>
            {!isTouchScreen && (
                <div className="text-black dark:text-white opacity-0 w-auto bg-white dark:bg-black text-center text-xs rounded-lg px-3 py-2 absolute z-10 group-hover:opacity-100 top-full left-1/2 transform -translate-x-1/2 pointer-events-none">
                    {tooltipText}
                </div>
            )}
        </>
    );
};

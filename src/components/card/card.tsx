import React from "react";

interface CardProps {
  color: string;
  children: React.ReactNode;
  margin?: string;
  height?: string;
  position?: string;
  maxWidth?: string;
  hoverEnabled?: boolean
}

export default function Card(props: CardProps) {
  return (
    <div className={`${props.hoverEnabled ? 'transition duration-300 ease-in-out  hover:shadow-3xl': ''} w-full ${props.position} ${props.maxWidth} ${props.height} ${props.margin} relative flex flex-col text-gray-700 ${props.color} shadow-md bg-clip-border rounded-xl text-justify `}>
      {props.children}
    </div>
  );
}

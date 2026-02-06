import React from "react";

interface CardProps {
  color: string;
  children: React.ReactNode;
  margin?: string;
  height?: string;
  position?: string;
  maxWidth?: string;
  hoverEnabled?: boolean,
  testId: string
}

export default function Card(props: CardProps) {
  return (
    <div
      data-testid={`card-${props.testId}`}
      className={`${props.hoverEnabled ? 'transition duration-300 ease-in-out hover:shadow-3xl-light dark:group-hover:shadow-3xl-dark' : ''} w-full ${props.position} ${props.maxWidth} ${props.height} ${props.margin} relative flex flex-col text-gray-700 ${props.color} shadow-md bg-clip-border rounded-xl text-justify `}>
      {props.children}
    </div>
  );
}

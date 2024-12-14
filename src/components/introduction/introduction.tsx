import React from "react";
import Card from "../card/card";
import { ProjectsCard } from "../../shared/projects/projectsCard";
import { ProjectTypes } from "../../models/projectType";

export default function Introduction() {
    return (
        <div data-testid='introduction'>
            <Card testId="introduction" color="bg-light-MainTheme dark:bg-dark-MainTheme" margin="mx-auto my-2 " maxWidth="max-md:max-w-[90%] md:max-w-[40%] lg:max-w-[40%] max-sm:max-w-[90%]">
                <a className="ml-5" href="https://calendly.com/hasancankucuk/discovery-call-to-know-me-better" target="_blank" rel="noopener noreferrer">
                    <button className="bg-light-inlineTheme bg-green-600/[0.3] text-white py-1 px-2 rounded-lg mr-9 mt-10 float-end w-32">
                        Calendly
                    </button>
                </a>
                <div className="rounded-lg flex flex-col justify-center sm:flex-row items-center px-10 py-10">
                    <div className="sm:w-full sm:mr-6 order-2 sm:order-1 my-5 text-slate-100">
                        <h4 className="text-black dark:text-white block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal">
                            Hasan Can Küçük
                        </h4>
                        <p className=" text-black dark:text-white block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                            📍 Now settled in Berlin, with my bags unpacked and ready to embark on my next professional journey.
                        </p>
                        <p className=" line-through text-black dark:text-white block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                            📍 Currently in Turkey, but my bags are packed and my passport is doing warm-up stretches.
                        </p>
                    </div>
                    <img src="/me.png" alt="profile-picture" className="w-36 h-36 object-cover rounded-full order-1" />
                </div>
                <ProjectsCard testId="introduction-company" type={ProjectTypes.Company} limit={3} isViewAll={true} header="Projects" />
                <ProjectsCard testId="introduction-side" type={ProjectTypes.Side} limit={3} isViewAll={true} header="Side Projects" />
                <ProjectsCard testId="introduction-open-source" type={ProjectTypes.OpenSource} limit={3} isViewAll={true} header="Open-Source" />
            </Card>

        </div>
    )
}


import React from "react"
import { ProjectTypes } from "../../models/projectType"
import { ProjectsCard } from "../../shared/projects/projectsCard"


interface ProjectSectionProps {
    title: string,
    summary: string,
    type: ProjectTypes
}

export default function ProjectSection(props: ProjectSectionProps) {
    return (
        <div data-testid='project-section'>
            <div className="rounded-lg flex flex-col  sm:flex-row px-10 py-10">
                <div className="sm:w-full sm:mr-6 order-2 sm:order-1 my-5 text-slate-100">
                    <h4 className="text-black dark:text-white block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal">
                        {props.title}
                    </h4>
                    <p className="text-black dark:text-white block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                        {props.summary}
                    </p>
                </div>
            </div>
            <ProjectsCard type={props.type} isViewAll={false} testId="project-section" />
        </div>
    )
}
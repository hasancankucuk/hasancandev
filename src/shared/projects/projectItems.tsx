import React from "react";
import { fetchData } from "@/services/firebase";
import Card from "../../components/card/card";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { ProjectTypes } from "@/models/projectType";
import Link from "next/link";
import { Projects } from "@/models/projectInfoType";

interface ProjectItemProps {
    type?: ProjectTypes
    limit?: number
}

export default async function ProjectItems(props: ProjectItemProps) {
    try {
        const projectsSnapshot = await fetchData(props.type, props.limit);
        const projects: QueryDocumentSnapshot<Projects>[] = projectsSnapshot;
        return (
            <div>
                {projects.map((projectSnapshot: QueryDocumentSnapshot<Projects>, index: number) => {
                    const projectData = projectSnapshot.data();
                    return (
                        <div key={index} className="mx-2">
                            <Link as={`/project/${projectData.id}`} href="project/[id]">
                                <Card height="xs:h-30" color="bg-inlineTheme" margin="my-4" hoverEnabled={true}>
                                    <div className="flex items-center">
                                        {projectData.icon && (
                                            <img
                                                src={projectData.icon}
                                                referrerPolicy="no-referrer"
                                                alt="Project Icon"
                                                className="w-16 h-15 my-2 ml-5 rounded-full"
                                            />
                                        )}
                                        <div className="text-white ml-5 my-5 px-2">
                                            <h2 className="text-lg font-semibold">{projectData.name}</h2>
                                            <p className="text-sm text-gray-300">{projectData.summary}</p>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    } catch (error) {
        console.error("Error fetching projects:", error);
        return null;
    }
}

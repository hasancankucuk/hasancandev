import { QueryDocumentSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import Card from "../../components/card/card";
import { fetchData } from "../../services/firebase";
import { useEffect, useState } from "react";
import { ProjectTypes } from "../../models/projectType";
import { Projects } from "../../models/projectInfoType";

interface ProjectItemsProps {
    type?: ProjectTypes;
    limit?: number;
}

const ProjectItems: React.FC<ProjectItemsProps> = (props) => {
    const [projects, setProjects] = useState<QueryDocumentSnapshot<Projects>[]>([]);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsSnapshot = await fetchData(props.type, props.limit);
                setProjects(projectsSnapshot);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [props.type, props.limit]);

    return (
        <div>
            {projects.map((projectSnapshot: QueryDocumentSnapshot<Projects>, index: number) => {
                const projectData = projectSnapshot.data();
                return (
                    <div key={index} className="mx-2">
                        {/* Use Link from React Router */}
                        <Link to={`/projects/${projectData.id}`}>
                            <Card testId="shared-projectItems" height="xs:h-30" color="bg-light-inlineTheme dark:bg-dark-inlineTheme" margin="my-4" hoverEnabled={true}>
                                <div className="flex items-center">
                                    {projectData.icon && (
                                        <img
                                            src={projectData.icon}
                                            referrerPolicy="no-referrer"
                                            alt="Project Icon"
                                            className="w-16 h-15 my-2 ml-4 rounded-full"
                                        />
                                    )}
                                    <div className="text-black dark:text-white ml-5 mr-3 my-5 px-2">
                                        <h2 className="text-lg font-semibold">{projectData.name}</h2>
                                        <p className="text-sm text-teal-950	dark:text-gray-300">{projectData.summary}</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default ProjectItems;

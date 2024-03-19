import { Link } from "react-router-dom";
import Card from "../../components/card/card";
import { ProjectTypes } from "../../models/projectType";
import ProjectItems from "./projectItems";

interface ProjectsCardProps {
    type: ProjectTypes;
    limit?: number;
    isViewAll?: boolean;
    header?: string;
}

export const ProjectsCard: React.FC<ProjectsCardProps> = (props) => {
    return (
        <Card color="bg-light-cardTheme dark:bg-dark-cardTheme opacity-75" margin="mx-auto my-2" maxWidth="md:max-w-[90%] lg:max-w-[90%] max-sm:max-w-[90%]">
            <div className="flex justify-between items-center my-2 ">
                {props.header && (
                    <span className="text-black dark:text-white my-2 mx-5 text-2xl">
                        {props.header}
                    </span>
                )}
                {props.isViewAll && (
                    <div>
                        <Link to="/projects">
                            <button className="mx-5 bg-light-inlineTheme dark:bg-dark-cardTheme hover:bg-dark-cardTheme text-black dark:text-white font-bold py-1 px-2 rounded-lg">
                                View All
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <ProjectItems type={props.type} limit={props.limit} />
        </Card>
    );
};

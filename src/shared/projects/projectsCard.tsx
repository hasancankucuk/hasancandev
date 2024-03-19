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
        <Card color="bg-cardTheme opacity-75" margin="mx-auto my-2" maxWidth="md:max-w-[90%] lg:max-w-[90%] max-sm:max-w-[90%]">
            <div className="flex justify-between items-center my-2 text-slate-100">
                {props.header && (
                    <span className="my-2 mx-5 text-slate-100 text-2xl">
                        {props.header}
                    </span>
                )}
                {props.isViewAll && (
                    <div>
                        <Link to="/projects">
                            <button className="mx-5 bg-inlineTheme hover:bg-cardTheme text-white font-bold py-1 px-2 rounded-lg">
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

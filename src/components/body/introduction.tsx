import Card from "../card/card";
import { ProjectsCard } from "../../shared/projects/projectsCard";
import { ProjectTypes } from "../../models/projectType";

export default function Introduction() {
    return (
        <Info />
    )
}

const Info = () => {
    return (
        <Card color="bg-mainTheme" margin="mx-auto my-2 " maxWidth="max-md:max-w-[90%] md:max-w-[40%] lg:max-w-[40%] max-sm:max-w-[90%]">
            <div className="rounded-lg flex flex-col justify-center sm:flex-row items-center px-10 py-10">
                <div className="sm:w-full sm:mr-6 order-2 sm:order-1 my-5 text-slate-100">
                    <h4 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal">
                        Hasan Can Küçük
                    </h4>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                    📍 Currently in Turkey, but my bags are packed and my passport is doing warm-up stretches.
                    </p>
                </div>
                <img src="/me.png" alt="profile-picture" className="w-36 h-36 object-cover rounded-full order-1" />
            </div>
            <ProjectsCard type={ProjectTypes.Company} limit={3} isViewAll={true} header="Projects"/>
            <ProjectsCard type={ProjectTypes.Side} limit={3} isViewAll={true} header="Side Projects"/>
            <ProjectsCard type={ProjectTypes.OpenSource} limit={3} isViewAll={true} header="Open-Source"/>
        </Card>
    );
}



import Card from "@/components/card/card";
import { ProjectTypes } from "@/models/projectType";
import { fetchAboutData } from "@/services/firebase";
import { ProjectsCard } from "@/shared/projects/projectsCard";
import { DocumentData } from "firebase/firestore";

export default async function About () {
    var aboutData:DocumentData | null = await fetchAboutData();

    return (
        <Card color="bg-mainTheme" margin="mx-auto my-2 " maxWidth="min-h-dvh max-md:max-w-[90%] md:max-w-[40%] lg:max-w-[40%] max-sm:max-w-[90%]">
            <div className="rounded-lg flex flex-col justify-center sm:flex-row items-center px-10 py-10">
                <div className="my-5 text-slate-100">
                    <h4 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal">
                        {aboutData?.name}
                    </h4>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                        {aboutData?.text}
                    </p>
                </div>
            </div>
            <ProjectsCard type={ProjectTypes.Side} limit={3} isViewAll={true} header="Side Projects"/>
        </Card>
    );
}
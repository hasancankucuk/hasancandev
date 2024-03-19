import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fetchAboutData } from "../../services/firebase";
import Card from "../../components/card/card";
import { ProjectsCard } from "../../shared/projects/projectsCard";
import { ProjectTypes } from "../../models/projectType";

export const About = () => {
    const [aboutData, setAboutData] = useState<DocumentData | null>();

    useEffect(() => {
        const fetchAbout = async () => {
            const data = await fetchAboutData();
            setAboutData(data);
        };

        fetchAbout();
    }, []);

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
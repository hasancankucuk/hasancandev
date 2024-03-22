import Card from "../../components/card/card"
import ProjectSection from "../../components/projects/projectSection"
import { ProjectTypes } from "../../models/projectType"


export const Projects = () => {
    return (
        <Card testId="projects" color="bg-light-MainTheme dark:bg-dark-MainTheme" margin="mx-auto my-2 " maxWidth="max-md:max-w-[90%] md:max-w-[40%] lg:max-w-[40%] max-sm:max-w-[90%]">
            <ProjectSection type={ProjectTypes.Company} title="Projects" summary="Here is a showcase of the projects I've developed during my tenure at various workplaces. Please note that images may vary." />
            <ProjectSection type={ProjectTypes.Side} title="Side Projects" summary="Here's a glimpse into some of the side projects I enjoy working on – mainly building extensions!" />
            <ProjectSection type={ProjectTypes.OpenSource} title="Open-Source" summary="Explore the world of open-source contributions where I've made an impact. Whether it's valuable contributions to projects like Mattermost or improving React documentation, my commitment to the open-source community is evident."/>
        </Card>
    )
}
 
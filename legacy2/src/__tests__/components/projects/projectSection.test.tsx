import { cleanup, render, screen } from "@testing-library/react"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import ProjectSection from "../../../components/projects/projectSection"
import { ProjectTypes } from "../../../models/projectType"


beforeEach(() => {
    render(
        <BrowserRouter>
            <ProjectSection title={"Test Comp. Title"} summary={"Test Comp. Summary"} type={ProjectTypes.Company} />
        </BrowserRouter>
    )
});

afterEach(cleanup)

describe('Project Section Component', () => {
    it('renders correctly', () => {
        expect(screen.getByTestId('project-section')).toBeInTheDocument();
    });

    it('renders ProjectsCard correctly', () => {
        const projectSectionElement = screen.getByTestId('project-section').querySelector('[data-testid="projectsCard-project-section"]');
        expect(projectSectionElement).toBeInTheDocument();
    });
});
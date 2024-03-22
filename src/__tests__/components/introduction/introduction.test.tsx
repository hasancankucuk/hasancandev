import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Introduction from '../../../components/introduction/introduction';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
    render(
        <BrowserRouter>
            <Introduction />
        </BrowserRouter>
    );
});

afterEach(cleanup);

describe('Introduction Component', () => {
    it('renders correctly', () => {
        expect(screen.getByTestId('introduction')).toBeInTheDocument();
        expect(screen.getByText('Hasan Can Küçük')).toBeInTheDocument();
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByText('Side Projects')).toBeInTheDocument();
        expect(screen.getByText('Open-Source')).toBeInTheDocument();
    });

    it('renders Card component', () => {
        const cardElement = screen.getByTestId('introduction').querySelector('[data-testid="card-introduction"]');
        expect(cardElement).toBeInTheDocument();
    });

    it('renders ProjectsCard components', () => {
        const companyProjectsCard = screen.getByTestId('projectsCard-introduction-company');
        const sideProjectsCard = screen.getByTestId('projectsCard-introduction-side');
        const openSourceProjectsCard = screen.getByTestId('projectsCard-introduction-open-source');

        expect(companyProjectsCard).toBeInTheDocument();
        expect(sideProjectsCard).toBeInTheDocument();
        expect(openSourceProjectsCard).toBeInTheDocument();
    })
});

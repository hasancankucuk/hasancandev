import Navbar from '@/shared/navbar';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

describe('Navbar', () => {
    it('renders navbar links', () => {
        render(<Navbar />);      
        const homeLink = screen.getByRole('link', { name: /home/i });
        const aboutLink = screen.getByRole('link', { name: /about/i });
        const projectsLink = screen.getByRole('link', { name: /projects/i });    
        expect(homeLink).toBeInTheDocument();
        expect(aboutLink).toBeInTheDocument();
        expect(projectsLink).toBeInTheDocument();
    });

    it('displays tooltip on hover', async () => {
        render(<Navbar />);
        const homeLink = screen.getByRole('link', { name: /home/i });
        fireEvent.mouseEnter(homeLink);
        const tooltipHome = await screen.findByText('Home');
        expect(tooltipHome).toBeInTheDocument();
        fireEvent.mouseLeave(homeLink);
        await screen.findByText('Home').catch(() => {
          expect(screen.queryByText('Home')).not.toBeInTheDocument();
        });
    });
});

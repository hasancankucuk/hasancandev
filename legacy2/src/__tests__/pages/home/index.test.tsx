import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../../pages/home";



beforeEach(() => {
    render(
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    )
});

afterEach(cleanup)

describe('Home Page', () => {
    it('renders Home correctly', () => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
});
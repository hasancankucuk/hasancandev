import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Card from '../../../components/card/card';

afterEach(cleanup);

describe('Card Component', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <Card color="bg-blue-500" hoverEnabled={true} testId="test">
                <p>Test Content</p>
            </Card>
        );

        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('adds hover classes', () => {
        const { getByTestId } = render(
            <Card color="bg-blue-500" hoverEnabled={true} testId="test">
                <p>Test Content</p>
            </Card>
        );

        const card = getByTestId('card-test');
        fireEvent.mouseEnter(card);
        expect(card).toHaveClass('hover:shadow-3xl-light');
    });
});

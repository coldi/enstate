import React from 'react';
import {
    render,
    fireEvent,
    cleanup
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import StateProvider from '../src/StateProvider';
import Container from '../src/Container';

// TODO: add test for hook

describe('Container w/ render props', () => {
    let document;
    const actions = {
        increment: () => ({
            type: 'increment',
            reduce: state => ({ count: state.count + 1 }),
        }),
    };

    afterEach(cleanup);

    const renderTestApp = initialState => {
        document = render(
            <StateProvider initialState={initialState}>
                <Container actions={actions}>
                    {({ state, increment }) => (
                        <div>
                            <span data-testid="counter">{state.count}</span>
                            <button data-testid="btn" onClick={increment}>Click</button>
                        </div>
                    )}
                </Container>
            </StateProvider>
        );
    };

    describe('Given the component is mounted', () => {
        const initialState = { count: 0 };

        beforeEach(() => {
            renderTestApp(initialState);
        });

        it('should render with correct initial state', () => {
            expect(document.getByTestId('counter')).toHaveTextContent(0);
        });

        describe('Given the button gets clicked', () => {
            beforeEach(() => {
                fireEvent.click(document.getByTestId('btn'));
            });

            it('should update state', async () => {
                expect(document.getByTestId('counter')).toHaveTextContent(1);
            });
        });

        describe('Given the button gets clicked 2 times', () => {
            beforeEach(() => {
                fireEvent.click(document.getByTestId('btn'));
                fireEvent.click(document.getByTestId('btn'));
            });

            it('should update state', async () => {
                expect(document.getByTestId('counter')).toHaveTextContent(2);
            });
        });
    });
});

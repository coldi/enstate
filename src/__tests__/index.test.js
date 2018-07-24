import React from 'react';
import { mount } from 'enzyme';
import StateProvider from '../StateProvider';
import Context from '../Context';

// TODO: avoid mocking context API
// see: https://github.com/airbnb/enzyme/issues/1509
const mockContext = jest.fn();
jest.mock('../Context', () => ({
    Consumer: props => props.children(mockContext()),
    Provider: props => props.children,
}));

describe('StateProvider', () => {
    let renderedElement;

    const renderComponent = (state) => {
        renderedElement = mount(
            <StateProvider initialState={state}>
                <Context.Consumer>
                    {(context) => <div state={context.state}>{context.state.test}</div>}
                </Context.Consumer>
            </StateProvider>
        );
    };

    describe('Given the component is mounted', () => {
        const initialState = { test: true };

        beforeEach(() => {
            mockContext.mockReturnValue({ state: initialState });
            renderComponent(initialState);
        });

        it('should render with correct initial state', () => {
            expect(renderedElement.state().test).toBe(true);
            expect(renderedElement.find('div').length).toBe(1);
            expect(renderedElement.find('div').prop('state')).toEqual(initialState);
        });
    });
});

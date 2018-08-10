import React from 'react';
import { mount } from 'enzyme';
import StateProvider from '../src/StateProvider';
import Context from '../src/Context';

// TODO: avoid mocking context API
// see: https://github.com/airbnb/enzyme/issues/1509
const mockContext = jest.fn();
jest.mock('../src/Context', () => ({
    Consumer: props => props.children(mockContext()),
    Provider: props => props.children,
}));

describe('StateProvider', () => {
    let renderedElement;
    let instance;

    const renderComponent = (state) => {
        renderedElement = mount(
            <StateProvider initialState={state}>
                <Context.Consumer>
                    {(context) => (
                        <div state={context.state}>
                            {context.state.test}
                        </div>
                    )}
                </Context.Consumer>
            </StateProvider>
        );
        instance = renderedElement.instance();
    };

    describe('Given the component is mounted', () => {
        const initialState = { test: true };

        beforeEach(() => {
            mockContext.mockReturnValue({ state: initialState });
            renderComponent(initialState);
        });

        it('should instantiate proper StateProvider component', () => {
            expect(typeof instance.getState).toBe('function');
            expect(typeof instance.dispatch).toBe('function');
        });

        it('should render with correct initial state', () => {
            expect(renderedElement.state().test).toBe(true);
            expect(renderedElement.find('div').length).toBe(1);
            expect(renderedElement.find('div').prop('state')).toEqual(initialState);
        });
    });
});

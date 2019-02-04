import React from 'react';
import 'jest-dom/extend-expect';
import connectHook from '../src/connectHook';
import Container from '../src/Container';
import makeCounterTest from './makeCounterTest';

describe('Basic counter test', () => {
    const initialState = { count: 0 };
    const selectors = {
        getCount: state => () => state.count,
    };
    const actions = {
        increment: () => ({
            type: 'increment',
            update: state => ({ count: state.count + 1 }),
        }),
    };

    // prepare a component that uses the Container and it's render props
    function ContainerTest() {
        return (
            <Container selectors={selectors} actions={actions}>
                {({ getCount, increment }) => (
                    <React.Fragment>
                        <span data-testid="counter">{getCount()}</span>
                        <button data-testid="btn" onClick={increment}>
                            Click
                        </button>
                    </React.Fragment>
                )}
            </Container>
        );
    }

    // prepare a component that uses a connected hook
    const useConnect = connectHook({ selectors, actions });

    function HookTest() {
        const { getCount, increment } = useConnect();
        return (
            <React.Fragment>
                <span data-testid="counter">{getCount()}</span>
                <button data-testid="btn" onClick={increment}>
                    Click
                </button>
            </React.Fragment>
        );
    }

    // run tests
    describe('Container w/ render props', makeCounterTest(initialState, ContainerTest));
    describe('Component that uses hook', makeCounterTest(initialState, HookTest));
});

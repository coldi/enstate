import React from 'react';
import { render } from 'react-dom';
import { StateProvider, Container, connectHook } from '../src';

const actions = {
    increment: () => ({
        type: 'increment',
        reduce: state => ({ count: state.count + 1 }),
    }),
};

// ========================================================

const useConnect = connectHook({ actions });

function HookExample() {
    const { state, increment } = useConnect();

    return <button onClick={increment}>Update state ({state.count})</button>;
}

// ========================================================

function ContainerExample() {
    return (
        <Container actions={actions}>
            {({ state, increment }) => (
                <button onClick={increment}>Update state ({state.count})</button>
            )}
        </Container>
    );
}

// ========================================================

function App() {
    return (
        <StateProvider initialState={{ count: 0 }}>
            <div>
                <h1>Examples</h1>
                <section>
                    <h2>Using hooks</h2>
                    <HookExample />
                </section>
                <section>
                    <h2>Using Container w/ render props</h2>
                    <ContainerExample />
                </section>
            </div>
        </StateProvider>
    );
}

render(<App />, document.getElementById('root'));

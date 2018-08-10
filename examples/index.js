import React from 'react';
import { render } from 'react-dom';
import { StateProvider, Container } from '../src';

const actions = {
    increment: () => ({
        type: 'increment',
        reduce: state => ({ count: state.count + 1 }),
    }),
};

function App () {
    return (
        <StateProvider initialState={{ count: 0 }}>
            <div>
                <h1>Counter</h1>
                <Container actions={actions}>
                    {({ state, increment }) => (
                        <button onClick={increment}>
                            Update state ({state.count})
                        </button>
                    )}
                </Container>
            </div>
        </StateProvider>
    );
}

render(<App />, document.getElementById('root'));

# enstate

React state management library using Context API. With selectors, actions and middlewares.

**⚠ Experimental ⚠**

## Getting started

Install from GitHub repo:
```
npm i coldi/enstate
```

Usage:
```
import React from 'react';
import { StateProvider, Container } from 'enstate';

const actions = {
    increment: () => ({
        type: 'increment',
        reduce: state => ({ count: state.count + 1 })    
    }),
};

function App () {
    return (
        <StateProvider initialState={{ count: 0 }}>
            <div>
                <h1>Example App</h1>
                <Container actions={actions}>
                    {({ state, increment }) => (
                        <button onClick={increment}>Update state ({state.count})</button>
                    )}
                </Container>
            </div>
        </StateProvider>
    );
}
```

To run the examples locally:
```
npm start
```

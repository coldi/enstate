# Enstate

React state management library using Context API. With selectors, actions and middlewares.

**⚠ Experimental ⚠**

## Getting started

Install using either NPM or Yarn:
```
npm install enstate
```

```
yarn add enstate
```

Usage:
```js
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

To run the examples from this repo locally:
```
npm start
```

## API

### StateProvider

Provider component that holds the application state and update mechanics.

#### `initialState: Object`

Defines the initial state of your app.

```js
<StateProvider initialState={{ greeting: 'hello' }}>
    <Container>
        {({ state }) => <h1>{state.greeting}</h1>}
    </Container>
</StateProvider>
```

#### `middlewares: Array<Function>`

Defines the middlewares that will be called when an action gets dispatched.

**IMPORTANT:** If you use this prop you have to explicitly pass *all* middlewares
to it. Even the default one, that handles your action objects.<br>
This gives you total control of how actions are defined and processed.

Here's an example that uses the default action middleware and a custom persistence middleware:

```js
import { StateProvider, actionMiddleware } from 'enstate';

// very naïve persistence middleware
const persistenceMiddleware = provider => next => action => {
    if (typeof action === 'object') {
        localStorage.setItem('appState', JSON.stringify(provider.getState()));
    }
    
    return next(action);
};

const initialState = JSON.parse(localStorage.getItem('appState')) || {};

const middlewares = [actionMiddleware, persistenceMiddleware];

const App = () => (
  <StateProvider initialState={initialState} middlewares={middlewares}>
      ...
  </StateProvider>
);
```

##### Included middlewares

The package comes with the following middlewares out of the box:

**`actionMiddleware`**<br>
Expects dispatched action objects with a `type` string and a `reduce` function.

**`thunkMiddleware`**<br>
Expects dispatched functions for handling side effects (like data fetching and other async stuff).
The function receives an object `{ dispatch: Function, getState: Function }`.

**`devtoolsMiddleware`**<br>
Support for Redux Devtools extension. Disabled by default.

### Container

Container components gain access to the state and the connected selectors 
and actions via render props.

```js
<Container>
    {({ state }) => <span>{state.someValue}</span>}
</Container>
```

#### `selectors: Object`

Selectors are higher order functions that get connected to the state inside the 
Container component.<br>
The first function expects (optional) parameters and the second function receives
the state. When you use the selector via render props the state is already injected.

```js
const selectors = {
    getUserById: id => state => state.users[id]   
};

...

<Container selectors={selectors}>
    {({ getUserById }) => <span>{getUserById('foo')}</span>}
</Container>
```

#### `actions: Object`

Actions can be everything that your middlewares can work with. Most common usage is with objects.<br>
When you use the default `actionMiddleware` the object should contain a `type` string and
a `reduce` function. This function receives the state and should return a new state.

```js
const actions = {
    increment: () => ({
        type: 'increment',
        reduce: state => ({ count: state.count + 1 })    
    }),
};

...

<Container actions={actions}>
    {({ state, increment }) => (
        <button onClick={increment}>Update state ({state.count})</button>
    )}
</Container>
```

#### `onMount: Function`

A prop that can be used to perform a function when the Container component mounts.

Here's an example of two nested containers. One that connects a thunk and one that calls the thunk when mounted: 

```js
const actions = {
    fetchItems: () => ({ dispatch }) => {
        // fetch some async data and dispatch an action to update state
    },
};

...

<Container actions={actions}>
    {({ state, fetchItems }) => (
        <Container onMount={fetchItems}>
            {state.items.map(item => (<div>{item.name}</div>))}
        </Container>
    )}
</Container>
```

#### `onUnmount: Function`

A prop that can be used to perform a function when the Container component unmounts.


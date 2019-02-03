import React from 'react';
import { render } from 'react-testing-library';
import StateProvider from '../src/StateProvider';

export default function renderWithStateProvider(state, TestComponent) {
    return render(
        <StateProvider initialState={state}>
            <TestComponent />
        </StateProvider>
    );
}

import { useContext } from 'react';
import Context from './Context';
import { transformSelectors, transformActions } from './transform';

export default function connectHook ({ actions = {}, selectors = {} }) {
    return () => {
        const context = useContext(Context);
        return {
            state: context.state,
            ...transformSelectors(context, selectors),
            ...transformActions(context, actions),
        };
    };
}

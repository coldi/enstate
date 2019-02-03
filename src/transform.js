export function transformSelectors ({ state }, originalSelectors) {
    return Object.entries(originalSelectors)
        .reduce((selectors, [key, fn]) => ({
            ...selectors,
            [key]: fn(state),
        }), {});
}

export function transformActions ({ dispatch }, originalActions) {
    return Object.entries(originalActions)
        .reduce((actions, [key, fn]) => ({
            ...actions,
            [key]: (...args) => dispatch(fn(...args)),
        }), {});
}

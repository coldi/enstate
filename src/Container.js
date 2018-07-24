import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default class Container extends React.Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        selectors: PropTypes.shape(),
        actions: PropTypes.shape(),
        onMount: PropTypes.func,
        onUnmount: PropTypes.func,
    };

    static defaultProps = {
        selectors: {},
        actions: {},
    };

    componentDidMount () {
        if (this.props.onMount) this.props.onMount();
    }

    componentWillUnmount () {
        if (this.props.onUnmount) this.props.onUnmount();
    }

    transformSelectors ({ state }) {
        return Object.entries(this.props.selectors)
            .reduce((actions, [key, fn]) => ({
                ...actions,
                [key]: (...args) => fn(...args)(state),
            }), {});
    }

    transformActions ({ dispatch }) {
        return Object.entries(this.props.actions)
            .reduce((actions, [key, fn]) => ({
                ...actions,
                [key]: (...args) => dispatch(fn(...args)),
            }), {});
    }

    renderChildWithContext = (context) => (
        this.props.children({
            state: context.state,
            ...this.transformSelectors(context),
            ...this.transformActions(context),
        })
    );

    render() {
        const isChildFn = typeof this.props.children === 'function';

        return (
            <Context.Consumer>
                {isChildFn ? this.renderChildWithContext : () => this.props.children}
            </Context.Consumer>
        );
    }
}

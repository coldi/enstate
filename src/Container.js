import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { transformSelectors, transformActions } from './transform';

export default class Container extends React.Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        selectors: PropTypes.shape(),
        actions: PropTypes.shape(),
        onMount: PropTypes.func,
        onUpdate: PropTypes.func,
        onUnmount: PropTypes.func,
    };

    static defaultProps = {
        selectors: {},
        actions: {},
    };

    componentDidMount () {
        if (this.props.onMount) this.props.onMount();
    }

    componentDidUpdate () {
        if (this.props.onUpdate) this.props.onUpdate();
    }

    componentWillUnmount () {
        if (this.props.onUnmount) this.props.onUnmount();
    }

    renderChildWithContext = (context) => (
        this.props.children({
            state: context.state,
            ...transformSelectors(context, this.props.selectors),
            ...transformActions(context, this.props.actions),
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

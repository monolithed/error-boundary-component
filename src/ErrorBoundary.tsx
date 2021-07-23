import React, {
    Component,
    ErrorInfo,
    ReactNode
} from 'react';

import {dispatchErrorBoundaryEvent} from './ErrorBoundaryEvent'

type Props = {
    fallback?: () => JSX.Element;
};

type State = {
    error: boolean;
};

class ErrorBoundary extends Component<Props, State> {
    state: State = {error: false};

    static defaultProps = {
        fallback: () => <></>
    };

    static getDerivedStateFromError(error: Error): State {
        return {error: true};
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        dispatchErrorBoundaryEvent({error, info});

        console.error('ErrorBoundary:', error, info);
    }

    render(): ReactNode {
        const {error} = this.state;
        const {children, fallback} = this.props;

        if (error) {
            return fallback!();
        }

        return children;
    }
}

export {ErrorBoundary};

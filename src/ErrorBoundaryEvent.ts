import {ErrorInfo} from 'react';

const ErrorBoundaryEventType  = '@monolithed/error-boundary';

type ErrorBoundaryEventDetail = {
    error: Error;
    info: ErrorInfo
};

class ErrorBoundaryEvent extends CustomEvent<unknown> {
    constructor(type: string, detail: {detail: ErrorBoundaryEventDetail}) {
        super(ErrorBoundaryEventType, {detail});
    }
}

const dispatchErrorBoundaryEvent = (detail: ErrorBoundaryEventDetail): void => {
    const event = new ErrorBoundaryEvent(ErrorBoundaryEventType, {detail});

    globalThis.dispatchEvent(event);
};

declare global {
    interface WindowEventMap {
        [ErrorBoundaryEventType]: ErrorBoundaryEvent;
    }
}

export {
    ErrorBoundaryEvent,
    ErrorBoundaryEventType,
    dispatchErrorBoundaryEvent
};

export type {
    ErrorBoundaryEventDetail
};

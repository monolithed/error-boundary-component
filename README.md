# @monolithed/error-boundary-component

[![Build Status](https://travis-ci.org/monolithed/error-boundary-component.png)](https://travis-ci.org/monolithed/error-boundary-component)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)

[ErrorBoundary](https://reactjs.org/docs/error-boundaries.html) component.

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @monolithed/error-boundary-component --save
```

**Yarn**:

```
yarn add @monolithed/error-boundary-component
```

## Basic usage

```typescript
import React, {
    FunctionComponent,
    Suspense,
    lazy
} from 'react';

import {useScript} from '@monolithed/use-script-hook';
import {componentLoader} from '@monolithed/remote-component-loader';
import {ErrorBoundary} from '@monolithed/error-boundary-component';

type Props = {
    src: string;
    scope: string;
    module: string;
};

const LazyService: FunctionComponent<Props> = ({children, src, scope, module}): JSX.Element => {
    const {loaded, failed} = useScript({src});
    const remoteModule = componentLoader({scope, module});

    const RemoteComponent = lazy(remoteModule);

    return (
        <ErrorBoundary>
            <Suspense fallback="loading...">
                <RemoteComponent>{...children.props}</Component>
            </Suspense>
        </ErrorBoundary>
    );
};
```

## Options

```typescript
type Props = {
    fallback?: () => JSX.Element;
};
```

* **fallback** (optional)

## Event

Use the following subscription to log error information.

```typescript
import {
    ErrorBoundaryEventDetail,
    ErrorBoundaryEventType
} from '@monolithed/error-boundary-component';

globalThis.addEventListener(ErrorBoundaryEventType, ({detail}: CustomEvent<ErrorBoundaryEventDetail[]>) => {
    const {error, info} = detail;

    console.log({error, info});
});
```

## Publishing

```
npm publish --access public --verbose
```

## License

MIT

## Contributing
   
Feel free to submit a pull request if you find any bugs. <br /> 
Please make sure all commits are properly documented.

# Modal React Component

- [Docs](https://kseniya57.github.io/react-modal/?path=/docs/modal--playground)
- [Playground](https://kseniya57.github.io/react-modal/?path=/story/modal--playground)

[![NPM](https://img.shields.io/npm/v/@kaprisa57/react-modal.svg)](https://www.npmjs.com/package/@kaprisa57/react-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Coverage Status](https://coveralls.io/repos/github/kseniya57/react-modal/badge.svg?branch=master)](https://coveralls.io/github/kseniya57/react-modal?branch=master)

## Install

```bash
npm install --save @kaprisa57/react-modal
```

```bash
yarn add @kaprisa57/react-modal
```

## Advantages
- Fully and easily customizable.
- Uses styled-components.
- Provides useModal hook, which returns openModal promise.
- Supports children and content functions and provides them with some useful props.

## Basic Example

```jsx
import React from 'react'

import Modal, { ModalsRoot } from '@kaprisa57/react-modal'

// Define where modals should render
function App() {
    return (
        <div>
            <Example />
            <ModalsRoot />
        </div>
    )       
}

// Component with modal
function Example() {
  return <Modal>
    <button>Open</button>
  </Modal>
}
```

## useModal hook

> If you want to use useModal hook wrap your components in ModalsProvider

```js
const { openModal } = useModal();

const promise = openModal(content, modalProps)
```

Arguments:
- content - Modal content
- modalProps - Modal props

Returns: Promise

```jsx
import React from 'react'

import { ModalsProvider, useModal } from '@kaprisa57/react-modal'

// wrap your components in ModalsProvider
function App() {
    return (
        <ModalsProvider>
            <Example />
        </ModalsProvider>
    )       
}

// Component with modal
function Example() {
    const { openModal } = useModal();
  
    const handleOpen = useCallback(() => {
      openModal(({ close }) => (
        <button onClick={close}>Close</button>
      )).then(() => {
        alert('Modal closed');
      });
    }, [openModal]);
    
    return (
      <button onClick={handleOpen}>Open modal</button>
    );
}
```

### See more details in [storybook](https://kseniya57.github.io/react-modal/?path=/docs/modal--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/kaprisa57@gmail.com)

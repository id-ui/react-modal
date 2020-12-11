# Modal React Component

- [Docs](https://id-ui.github.io/react-modal/?path=/docs/modal--playground)
- [Playground](https://id-ui.github.io/react-modal/?path=/story/modal--playground)

[![NPM](https://img.shields.io/npm/v/@idui/react-modal.svg)](https://www.npmjs.com/package/@idui/react-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Coverage Status](https://coveralls.io/repos/github/id-ui/react-modal/badge.svg?branch=master)](https://coveralls.io/github/id-ui/react-modal?branch=master)

## Install

```bash
npm install --save @idui/react-modal
```

```bash
yarn add @idui/react-modal
```

## Advantages
- Fully and easily customizable.
- Uses styled-components.
- Provides useModal hook, which returns openModal promise.
- Supports children and content functions and provides them with some useful props.

## Basic Example

```jsx
import React from 'react'

import Modal, { ModalsRoot } from '@idui/react-modal'

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

import { ModalsProvider, useModal } from '@idui/react-modal'

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

### See more details in [storybook](https://id-ui.github.io/react-modal/?path=/docs/modal--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/id-ui)

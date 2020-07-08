# @kseniya57/react-modal

### [Docs here](https://kseniya57.github.io/react-modal/Modal?path=/docs/mdx-modal--page)

> Modal React Component

[![NPM](https://img.shields.io/npm/v/@kseniya57/modal.svg)](https://www.npmjs.com/package/@kseniya57/modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @kseniya57/react-modal
```

## A basic example

```jsx
import React from 'react'

import Modal, { ModalsRoot } from '@kseniya57/react-modal'

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

import { ModalsProvider, useModal } from '@kseniya57/react-modal'

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

### [Docs here](https://kseniya57.github.io/react-modal/Modal?path=/docs/mdx-modal--page)

## License

MIT © [kaprisa57@gmail.com](https://github.com/kaprisa57@gmail.com)

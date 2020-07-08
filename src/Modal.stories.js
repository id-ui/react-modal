import React, { Fragment, useCallback } from 'react';
import { Button } from '@storybook/react/demo';
import Modal from './Modal';
import ModalsProvider from './ModalsProvider';
import { withA11y } from '@storybook/addon-a11y';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { useModal } from './hooks';

const withProvider = (story) => <ModalsProvider>{story()}</ModalsProvider>;

export default {
  title: 'Modal',
  decorators: [withA11y, withKnobs, withPropsTable, centered, withProvider],
  parameters: {
    props: {
      propTablesInclude: [Modal],
    },
  },
};

export const playground = () => (
  <Modal
    content={text('content', 'Hello!')}
    closeOnRemoteClick={boolean('closeOnRemoteClick', true)}
    closeOnEscape={boolean('closeOnEscape', true)}
    closeOnEnter={boolean('closeOnEnter', false)}
    onClose={action('onClose')}
  >
    <Button type="button">Open Modal</Button>
  </Modal>
);

export const basicModal = () => (
  <Modal content="Hello!">
    <Button type="button">Open Modal</Button>
  </Modal>
);

export const closeModalByContent = () => (
  <Modal content={({ close }) => <Button onClick={close}>Close</Button>}>
    <Button type="button">Open Modal</Button>
  </Modal>
);

export const customWrapperTag = () => (
  <Modal
    content={'Trigger wrapper is span, but it is div by default'}
    tag="span"
  >
    <Button type="button">Open Modal</Button>
  </Modal>
);

export const triggerByChildren = () => (
  <Modal content={({ close }) => <Button onClick={close}>Close</Button>}>
    {({ open }) => (
      <Fragment>
        <div style={{ marginBottom: '20px' }}>
          <Button type="button">Simple Button</Button>
          <Button type="button" onClick={open}>
            Open Modal
          </Button>
          <Button type="button">Simple Button</Button>
        </div>
        <div>
          <input placeholder="Start typing to open modal.." onChange={open} />
        </div>
      </Fragment>
    )}
  </Modal>
);

export const closeModalOnEnter = () => (
  <Modal content="Hello!" closeOnEnter>
    <span>Open Modal</span>
  </Modal>
);

function UsingModalHook() {
  const { openModal } = useModal();

  const handleOpen = useCallback(
    (index) => () => {
      openModal(({ close }) => (
        <div>
          <Button onClick={handleOpen(index + 1)}>Open another modal</Button>
          <Button onClick={close}>Close</Button>
        </div>
      )).then(() => {
        alert('Modal closed' + index);
      });
    },
    [openModal]
  );

  return <Button onClick={handleOpen(0)}>Open modal</Button>;
}

export const useModalHook = () => <UsingModalHook />;

import React, { Fragment, useCallback } from 'react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import Modal from './Modal';
import ModalsProvider from './ModalsProvider';
import { useModal } from './hooks';

const withProvider = (story) => <ModalsProvider>{story()}</ModalsProvider>;

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether close on escape button press or not',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    closeOnEnter: {
      control: 'boolean',
      description: 'Whether close on enter button press or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    closeOnRemoteClick: {
      control: 'boolean',
      description:
        "Whether close on remote click or not. Default trigger === 'click' || trigger === 'contextMenu'.",
      defaultValue: undefined,
      table: {
        defaultValue: { summary: undefined },
      },
    },
    children: {
      disabled: true,
      description:
        'Accepts strings, numbers, elements, function (or Component). Modal provides prop isOpen and methods toggle, open and close to children function arguments or Component props.',
    },
    content: {
      control: 'string',
      description:
        'Accepts strings, numbers, elements, function (or Component). Modal provides method close to content function arguments or Component props.',
    },
    className: { control: 'string', description: 'Modal content className' },
    onClose: {
      action: 'onClose',
      description: 'Function, called when modal closes',
    },
    tag: {
      control: 'string',
      description:
        'Tag for modal trigger (used only if children are not a function)',
      defaultValue: 'div',
      table: { defaultValue: { summary: 'div' } },
    },
  },
  decorators: [withPropsTable, withProvider],
  parameters: {
    props: {
      propTablesInclude: [Modal],
    },
  },
};

export const playground = (props) => (
  <Modal {...props}>
    <button type="button">Open Modal</button>
  </Modal>
);

playground.args = {
  closeOnEscape: true,
  closeOnEnter: true,
  closeOnRemoteClick: true,
  content: 'Hi!',
};

export const basicModal = () => (
  <Modal content="Hello!">
    <button type="button">Open Modal</button>
  </Modal>
);

export const closeModalByContent = () => (
  <Modal content={({ close }) => <button onClick={close}>Close</button>}>
    <button type="button">Open Modal</button>
  </Modal>
);

export const customWrapperTag = () => (
  <Modal
    content={'Trigger wrapper is span, but it is div by default'}
    tag="span"
  >
    <button type="button">Open Modal</button>
  </Modal>
);

export const triggerByChildren = () => (
  <Modal content={({ close }) => <button onClick={close}>Close</button>}>
    {({ open }) => (
      <Fragment>
        <div style={{ marginBottom: '20px' }}>
          <button type="button">Simple button</button>
          <button type="button" onClick={open}>
            Open Modal
          </button>
          <button type="button">Simple button</button>
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
          <button onClick={handleOpen(index + 1)}>Open another modal</button>
          <button onClick={close}>Close</button>
        </div>
      )).then(() => {
        alert('Modal closed' + index);
      });
    },
    [openModal]
  );

  return <button onClick={handleOpen(0)}>Open modal</button>;
}

export const useModalHook = () => <UsingModalHook />;

import React, { useCallback } from 'react';
import {
  fireEvent,
  render as rtlRender,
  waitFor,
} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Modal, { ModalsProvider } from '..';
import { useModal, useOpen } from '../hooks';

const render = (ui, options = {}) => {
  function Wrapper({ children }) {
    return <ModalsProvider>{children}</ModalsProvider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

describe('Modal', () => {
  it('accessible', async () => {
    const { container } = render(<Modal content="Content">Open Modal</Modal>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders children', () => {
    const { getByTestId } = render(
      <Modal>
        <button data-testid="button">Open Modal</button>
      </Modal>
    );
    expect(getByTestId('button')).toBeInTheDocument();
  });

  it('opens modal on click children (basic case)', async () => {
    const { getByTestId, queryByTestId } = render(
      <Modal content={<span data-testid="content">Content</span>}>
        <button data-testid="button">Open Modal</button>
      </Modal>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('opens modal by children', async () => {
    const { getByTestId, queryByTestId } = render(
      <Modal content={<span data-testid="content">Content</span>}>
        {({ open }) => (
          <div data-testid="rootChild">
            <button data-testid="button" onClick={open}>
              Open Modal
            </button>
          </div>
        )}
      </Modal>
    );
    user.click(getByTestId('rootChild'));
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('closes modal on down remote click', async () => {
    const { getByTestId, queryByTestId, getByRole } = render(
      <Modal content={<span data-testid="content">Content</span>}>
        <button data-testid="button">Open Modal</button>
      </Modal>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    const root = getByRole('dialog');
    const button = document.createElement('button');
    root.appendChild(button);
    fireEvent.mouseDown(button, { which: 1 });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('closes modal on down escape key', async () => {
    const { getByTestId, queryByTestId } = render(
      <Modal content={<span data-testid="content">Content</span>}>
        <button data-testid="button">Open Modal</button>
      </Modal>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('closes modal on down enter key', async () => {
    const { getByTestId, queryByTestId } = render(
      <Modal
        closeOnEnter={true}
        content={<span data-testid="content">Content</span>}
      >
        <button data-testid="button">Open Modal</button>
      </Modal>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.keyDown(document.body, { key: 'Enter', code: 'Enter' });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('opens modal by useModal hook', async () => {
    const { getByTestId, queryByTestId } = render(<UsingModalHook />);
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('useOpen', async () => {
    const { result } = renderHook(useOpen);
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });
});

function UsingModalHook() {
  const { openModal } = useModal();

  const handleOpen = useCallback(() => {
    openModal(({ close }) => (
      <button onClick={close} data-testid="content">
        Close
      </button>
    )).then(() => {});
  }, [openModal]);

  return (
    <button onClick={handleOpen} data-testid="button">
      Open modal
    </button>
  );
}

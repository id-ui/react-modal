import { useCallback, useState, useEffect, useRef } from 'react';
import _ from 'lodash';

export default ({
  closeOnEscape,
  closeOnEnter,
  closeOnRemoteClick,
  onClose = _.noop,
} = {}) => {
  const target = useRef();
  const parentNode = useRef(document.body);

  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    onClose();
  }, [onClose]);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const remoteClickListener = (e) => {
      if (
        isOpen &&
        closeOnRemoteClick &&
        (!target.current || !target.current.contains(e.target)) &&
        (e.which || e.button) === 1 &&
        (!parentNode.current || parentNode.current.contains(e.target))
      ) {
        close();
      }
    };
    const keyDownListener = (e) => {
      if (
        isOpen &&
        [closeOnEscape && 'Escape', closeOnEnter && 'Enter'].includes(e.key)
      ) {
        close();
      }
    };

    document.addEventListener('click', remoteClickListener);
    document.addEventListener('keydown', keyDownListener);

    return () => {
      document.removeEventListener('click', remoteClickListener);
      document.removeEventListener('keydown', keyDownListener);
    };
  }, [isOpen, closeOnRemoteClick, close, closeOnEscape, closeOnEnter]);

  return {
    isOpen,
    setOpen,
    open,
    close,
    toggle,
    target,
    parentNode,
  };
};

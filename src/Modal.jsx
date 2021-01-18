import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import { useOpen } from './hooks';
import { StyledModal, ModalOverlay, ModalWindow } from './styled';
import { MODALS_ROOT_ID } from './ModalsRoot';

function Modal({ children, tag, content, className, ...useOpenArgs }) {
  const { target, parentNode, isOpen, open, close, toggle } = useOpen(
    useOpenArgs
  );

  const Trigger = `${tag}`;

  const container = document.getElementById(MODALS_ROOT_ID);

  return (
    <Fragment>
      {container &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <ModalOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                ref={parentNode}
              >
                <ModalWindow>
                  <StyledModal
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    ref={target}
                    className={className}
                  >
                    {_.isFunction(content) ? content({ close }) : content}
                  </StyledModal>
                </ModalWindow>
              </ModalOverlay>
            )}
          </AnimatePresence>,
          container
        )}

      {_.isFunction(children) ? (
        children({ isOpen, toggle, close, open })
      ) : (
        <Trigger onClick={toggle} role="button">
          {children}
        </Trigger>
      )}
    </Fragment>
  );
}

Modal.defaultProps = {
  onClose: _.noop,
  closeOnRemoteClick: true,
  closeOnEscape: true,
  closeOnEnter: false,
  tag: 'div'
};

Modal.propTypes = {
  /**
   * Accepts strings, numbers, elements, function (or Component)
   * Modal provides prop isOpen and methods toggle, open and close to children function arguments or Component props
   * @default undefined
   */
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * Accepts strings, numbers, elements, function (or Component)
   * Modal provides method close to content function arguments or Component props
   * @default undefined
   */
  content: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * Modal content className
   * @default undefined
   */
  className: PropTypes.string,
  /**
   * This function will be called when modal closes
   * @default () => {}
   */
  onClose: PropTypes.func,
  /**
   * Whether close modal on Escape button press or not
   * @default true
   */
  closeOnEscape: PropTypes.bool,
  /**
   * Whether close modal on Enter button press or not
   * @default false
   */
  closeOnEnter: PropTypes.bool,
  /**
   * Whether close modal on remote click or not
   * @default true
   */
  closeOnRemoteClick: PropTypes.bool,
  /**
   * Tag for modal trigger (used only if children are not a function)
   * @default div
   */
  tag: PropTypes.string
};

export default Modal;

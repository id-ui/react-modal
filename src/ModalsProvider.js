import React, {
  Fragment,
  useCallback,
  useState,
  createContext,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import ModalsRoot from './ModalsRoot';
import _ from 'lodash';
import Modal from './Modal';

export const ModalsContext = createContext({});

function ModalsProvider({ children }) {
  const [modals, setModals] = useState([]);
  const modalsRef = useRef(modals);

  useEffect(() => {
    modalsRef.current = modals;
  }, [modals]);

  const modalTrigger = useCallback(({ isOpen, open }) => {
    if (!isOpen) {
      open();
    }
  }, []);

  const openModal = useCallback(
    (Component, modalProps = {}) =>
      new Promise((resolve) => {
        const key = parseInt(_.last(_.keys(modalsRef.current)) || 0, 10) + 1;

        const handleClose = () => {
          setTimeout(() => {
            setModals(_.omit(modalsRef.current, key));
          }, 100);
          resolve();
        };

        setModals({
          ...modalsRef.current,
          [key]: (
            <Modal
              key={key}
              onClose={handleClose}
              content={Component}
              {...modalProps}
            >
              {modalTrigger}
            </Modal>
          ),
        });
      }),
    [modalTrigger]
  );

  return (
    <Fragment>
      <ModalsContext.Provider value={{ openModal }}>
        {children}
        {_.values(modals)}
      </ModalsContext.Provider>
      <ModalsRoot />
    </Fragment>
  );
}

ModalsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ModalsProvider;

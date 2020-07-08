import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const ModalWindow = styled.div`
  margin: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 10%);
  width: 100%;
`;

export const StyledModal = styled(motion.div)`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 0.3rem;
`;

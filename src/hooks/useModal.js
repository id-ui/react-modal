import { useContext } from 'react';
import { ModalsContext } from '../ModalsProvider';

export default () => {
  return useContext(ModalsContext);
};

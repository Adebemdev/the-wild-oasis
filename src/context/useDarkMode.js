import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('DarkModeContext was used outside the dar mode provider');

  return context;
};

export default useDarkMode;

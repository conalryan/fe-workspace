import React, { createContext, useContext, useState } from 'react';

interface BasicContextType {
  baseCtx: string;
  setBaseCtx: React.Dispatch<React.SetStateAction<string>>;
}

const BasicContext = createContext<BasicContextType>({
  baseCtx: '',
  setBaseCtx: () => {
    /* no-op */
  },
});

export const BasicProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [baseCtx, setBaseCtx] = useState('Initial Value');
  return <BasicContext.Provider value={{ baseCtx, setBaseCtx }}>{children}</BasicContext.Provider>;
};

export const BasicComponent = () => {
  const { baseCtx, setBaseCtx } = useContext(BasicContext);
  return (
    <div>
      <p>{baseCtx}</p>
      <button onClick={() => setBaseCtx('Updated Value')}>Update</button>
    </div>
  );
};

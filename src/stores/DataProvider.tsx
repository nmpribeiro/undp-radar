import React from 'react';

import { dataState, actions } from './data/data.state';

const CountContext = dataState.getContext();
const useDataState = dataState.useContext(
  CountContext,
  {
    // increment: () => increment(1),
    // decrement: () => decrement(1),
    // reset,
    reset: () => actions.reset()
  },
  {
    // testAsync: () => testAsync(10),
  }
);

const DataProvider: React.FC = ({ children }) => (
  <CountContext.Provider value={dataState.getMemoValueHook()()}>
    {children}
  </CountContext.Provider>
);

export { DataProvider, useDataState };

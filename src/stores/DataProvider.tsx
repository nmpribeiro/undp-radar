import React from 'react';

import { dataState, actions } from './data/data.state';

const CountContext = dataState.getContext();
const useDataState = dataState.useContext(
  CountContext,
  {
    setHorizonPriorityOrder: actions.setHorizonPriorityOrder,
    setQuadrantPriorityOrder: actions.setQuadrantPriorityOrder,
    reset: actions.reset
  },
  {
    setKeys: actions.setKeys,
    setRadarConf: actions.setRadarConf
  }
);

const DataProvider: React.FC = ({ children }) => (
  <CountContext.Provider value={dataState.getMemoValueHook()()}>
    {children}
  </CountContext.Provider>
);

export { DataProvider, useDataState };

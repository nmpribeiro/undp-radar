import React from 'react';

import { radarModule, actions } from './radar/radar.state';

const CountContext = radarModule.getContext();
const useRadarState = radarModule.useContext(
  CountContext,
  {
    reset: actions.reset,
    setBlips: actions.setBlips,
    setRadarData: actions.setRadarData,
    setTechFilter: actions.setTechFilter,
    setHoveredTech: actions.setHoveredTech,
    setHoveredItem: actions.setHoveredItem,
    setSelectedItem: actions.setSelectedItem,
    setUseCaseFilter: actions.setUseCaseFilter,
    setSelectedQuadrant: actions.setSelectedQuadrant,
    setDisasterTypeFilter: actions.setDisasterTypeFilter
  },
  {
    fetchRadarBlips: actions.fetchRadarBlips
  }
);

const RadarProvider: React.FC = ({ children }) => (
  <CountContext.Provider value={radarModule.getMemoValueHook()()}>
    {children}
  </CountContext.Provider>
);

export { RadarProvider, useRadarState };

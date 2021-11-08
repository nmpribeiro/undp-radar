import React, { useEffect } from 'react';

import { KeysObject, RadarOptionsType } from '../types';

import { useDataState } from '../stores/DataProvider';

interface Props {
  keys: KeysObject;
  radarConf?: Partial<RadarOptionsType>;
  horizonOrder?: string[];
  quadrantOrder?: string[];
}

export const SetData: React.FC<Props> = ({
  keys,
  radarConf,
  horizonOrder,
  quadrantOrder
}) => {
  const {
    setKeys,
    setRadarConf,
    setHorizonPriorityOrder,
    setQuadrantPriorityOrder
  } = useDataState();

  useEffect(() => {
    setKeys(keys);
  }, [keys]);

  useEffect(() => {
    if (radarConf) setRadarConf(radarConf);
  }, [radarConf]);

  useEffect(() => {
    if (horizonOrder) setHorizonPriorityOrder(horizonOrder);
  }, [horizonOrder]);

  useEffect(() => {
    if (quadrantOrder) setQuadrantPriorityOrder(quadrantOrder);
  }, [quadrantOrder]);

  return <React.Fragment />;
};

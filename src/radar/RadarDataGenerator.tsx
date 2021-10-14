import React, { useEffect } from 'react';

import { RADAR_OPTIONS } from '../constants/RadarData';

import { RadarUtilities } from './utilities/RadarUtilities';
import { useRadarState } from '../stores/RadarProvider';
import { useDataState } from '..';

export const RadarDataGenerator: React.FC = () => {
  const {
    state: { rawBlips, radarData },
    setBlips,
    setRadarData,
  } = useRadarState();

  const {
    state: { keys, priorityOrders },
  } = useDataState();

  useEffect(() => {
    if (rawBlips.length > 0 && radarData) {
      const { radarData: newRadarData, blips: newBlips } = RadarUtilities.getRadarData(
        rawBlips,
        { ...RADAR_OPTIONS },
        keys,
        priorityOrders
      );
      setBlips(newBlips);
      setRadarData({ ...newRadarData });
    }
  }, [rawBlips]);
  return <></>;
};

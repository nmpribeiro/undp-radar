import React, { useEffect } from 'react';

import { useDataState } from '../stores/DataProvider';
import { useRadarState } from '../stores/RadarProvider';
import { RadarUtilities } from '../radar/RadarUtilities';

export const RadarDataGenerator: React.FC = () => {
  const {
    state: { rawBlips, radarData },
    setBlips,
    setRadarData
  } = useRadarState();

  const {
    state: { keys, priorityOrders, radarOptions }
  } = useDataState();

  // useEffect(() => {
  //   console.log('rawBlips changed: ', rawBlips);
  // }, [rawBlips]);

  // useEffect(() => {
  //   console.log('radarData changed: ', radarData);
  // }, [radarData]);

  // useEffect(() => {
  //   console.log('keys changed: ', keys);
  // }, [keys]);

  // useEffect(() => {
  //   console.log('priorityOrders changed: ', priorityOrders);
  // }, [priorityOrders]);

  useEffect(() => {
    // TODO: fix this unnecessary re-rendering
    console.log('rawBlips, keys, priorityOrders, radarOptions changed');
    if (rawBlips.length > 0 && radarData) {
      const { radarData: newRadarData, blips: newBlips } =
        RadarUtilities.getRadarData(
          rawBlips,
          radarOptions,
          keys,
          priorityOrders
        );
      setBlips(newBlips);
      setRadarData({ ...newRadarData });
    }
  }, [rawBlips, keys, priorityOrders, radarOptions]);

  return <React.Fragment />;
};

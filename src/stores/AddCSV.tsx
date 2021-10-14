import React, { useEffect } from 'react';

import { MappingType, RawBlipType } from '../types';

import { useRadarState } from './RadarProvider';

interface Props {
  csvFile: string;
  mapping: MappingType<RawBlipType>;
}

export const AddCSV: React.FC<Props> = ({ csvFile, mapping }) => {
  const { fetchRadarBlips } = useRadarState();

  useEffect(() => {
    fetchRadarBlips(csvFile, mapping);
  }, [csvFile]);

  return <React.Fragment />;
};

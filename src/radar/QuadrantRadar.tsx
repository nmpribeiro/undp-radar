import React, { useEffect, useState } from 'react';
import { useDataState } from '../stores/DataProvider';

import { useRadarState } from '../stores/RadarProvider';
import { BlipType, QuadrantKey } from '../types';

import { RadarSVG } from './svg_comps/RadarSVG';

interface Props {
  selectedQuadrant?: QuadrantKey;
}

export const QuadrantRadar: React.FC<Props> = ({ selectedQuadrant }) => {
  const {
    state: { blips, useCaseFilter, disasterTypeFilter, radarData },
    setSelectedItem,
    setHoveredItem,
    setSelectedQuadrant
  } = useRadarState();

  const {
    state: {
      keys: { useCaseKey, disasterTypeKey }
    }
  } = useDataState();

  const [filtered, setFiltered] = useState<BlipType[]>([]);

  useEffect(() => {
    console.log('blips: ', blips);
    let newFiltered = blips;
    if (useCaseFilter !== 'all')
      newFiltered = newFiltered.filter((i) => i[useCaseKey] === useCaseFilter);
    if (disasterTypeFilter !== 'all')
      newFiltered = newFiltered.filter(
        (i) => i[disasterTypeKey] === disasterTypeFilter
      );
    console.log('newFiltered: ', newFiltered);
    setFiltered(newFiltered);
  }, [blips]);

  return (
    <RadarSVG
      quadrant={selectedQuadrant}
      context={{
        blips: filtered,
        radarData,
        logic: {
          setSelectedItem,
          setHoveredItem,
          setSelectedQuadrant
        }
      }}
    />
  );
};

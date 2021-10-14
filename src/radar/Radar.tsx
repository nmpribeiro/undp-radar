import React from 'react';

import { Title } from '../components/shared/Title';
import { DEFAULT_TITLE } from '../constants/RadarData';
import { useRadarState } from '../stores/RadarProvider';

import { RadarSVG } from './svg_comps/RadarSVG';
// SCSS
import './RadarSvg.scss';

export const Radar: React.FC = () => {
  const {
    state: { blips, radarData },
    setSelectedItem,
    setHoveredItem,
    setSelectedQuadrant
  } = useRadarState();
  return (
    <>
      <Title label={DEFAULT_TITLE} />
      <div style={{ padding: 10 }}>
        <RadarSVG
          dimensions={{ w: 600, h: 600 }}
          context={{
            radarData,
            blips,
            logic: { setSelectedItem, setHoveredItem, setSelectedQuadrant }
          }}
        />
      </div>
    </>
  );
};

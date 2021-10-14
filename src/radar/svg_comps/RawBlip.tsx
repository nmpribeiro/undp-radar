/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import { BlipType, TitleKey } from '../../types';
import './RawBlip.scss';

export const RawBlip: React.FC<{
  blip: BlipType;
  blipSize?: number;
  scaleFactor?: number;
  hoveredItem: BlipType | null;
  selectedItem: BlipType | null;
  getFill: (blip: BlipType, index: number) => string;
  setHoveredItem: (blip: BlipType | null) => void;
  setSelectedItem: (blip: BlipType | null) => void;
  tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, d3.BaseType>;
  titleKey: TitleKey;
}> = ({
  blip,
  blipSize = 1,
  scaleFactor = 1,
  hoveredItem,
  selectedItem,
  getFill,
  setHoveredItem,
  setSelectedItem,
  tooltip,
  titleKey
}) => {
  const openToolTip = () => {
    tooltip.attr('display', 'initial');
    tooltip.transition().duration(200).style('opacity', 0.9);
  };
  const closeTooltip = () => {
    setHoveredItem(null);
    tooltip
      .transition()
      .duration(250)
      .style('opacity', 0)
      .end()
      .then(() => tooltip.attr('display', 'none'))
      .catch(() => {
        // no need to act
      });
  };
  return (
    <g
      key={blip.id}
      className='blip'
      id={`blip-${blip.id}`}
      transform={`translate(${blip.x * scaleFactor}, ${blip.y * scaleFactor})`}
      cursor='pointer'
      onMouseOver={(event) => {
        openToolTip();
        tooltip
          .html(`<h4>${blip[titleKey]}</h4>`)
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 10}px`);
      }}
      onMouseMove={(event) =>
        tooltip
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 10}px`)
      }
      onMouseOut={() => {
        closeTooltip();
      }}
      onMouseEnter={() => setHoveredItem(blip)}
      onMouseUp={() => {
        if (selectedItem && selectedItem.id === blip.id) setSelectedItem(null);
        else setSelectedItem(blip);
        closeTooltip();
      }}
    >
      <circle className='circle' r={6 * blipSize} fill={getFill(blip, 0)} />
      {/* https://codepen.io/riccardoscalco/pen/GZzZRz */}
      <circle
        className={`circle ${
          hoveredItem?.id === blip.id ? 'circle-pulse1' : ''
        }`}
        r={8 * blipSize}
        strokeWidth={1.5 * blipSize}
        stroke={getFill(blip, 1)}
        fill='none'
      />
      <circle
        className={`circle ${
          hoveredItem?.id === blip.id ? 'circle-pulse2' : ''
        }`}
        r={11 * blipSize}
        strokeWidth={0.5 * blipSize}
        stroke={getFill(blip, 2)}
        fill='transparent'
      />
    </g>
  );
};

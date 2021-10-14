import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { v4 } from 'uuid';

import { useRadarState } from '../../stores/RadarProvider';
import { useDataState } from '../../stores/DataProvider';
import { BlipType, QuadrantKey, TechItemType, TechKey } from '../../types';
import { RadarUtilities } from '../utilities/RadarUtilities';

import './Blips.scss';

const RawBlip: React.FC<{
  blip: BlipType;
  blipSize?: number;
  scaleFactor?: number;
  hoveredItem: BlipType | null;
  selectedItem: BlipType | null;
  getFill: (blip: BlipType, index: number) => string;
  setHoveredItem: (blip: BlipType | null) => void;
  setSelectedItem: (blip: BlipType | null) => void;
  tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, d3.BaseType>;
  techKey: TechKey;
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
  techKey
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
      .catch(() => {}); // no need to act
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
          .html(`<h4>${blip[techKey]}</h4>`)
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 10}px`);
        event.currentTarget.setAttribute('opacity', '0.5');
      }}
      onMouseMove={(event) =>
        tooltip
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 10}px`)
      }
      onMouseOut={(event) => {
        closeTooltip();
        event.currentTarget.setAttribute('opacity', '1');
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

interface Props {
  quadrant?: QuadrantKey | null;
  scaleFactor?: number;
  blipSize?: number;
}

export const Blips: React.FC<Props> = ({
  scaleFactor = 1,
  blipSize = 1,
  quadrant = null
}) => {
  const {
    state: {
      blips,
      useCaseFilter,
      disasterTypeFilter,
      techFilter,
      radarData,
      selectedItem,
      hoveredItem,
      hoveredTech
    },
    setHoveredItem,
    setSelectedItem
  } = useRadarState();

  const {
    state: {
      keys: { techKey, quadrantKey, useCaseKey, disasterTypeKey, titleKey }
    }
  } = useDataState();

  const [displayBlips, setDisplayBlips] = useState<BlipType[]>([]);

  useEffect(() => {
    // process and sort the blips
    let filtered = blips.sort(RadarUtilities.blipsSorting);
    if (quadrant) {
      filtered = filtered.filter((b) => b[quadrantKey] === quadrant);
    } else {
      if (useCaseFilter !== 'all')
        filtered = filtered.filter((i) => i[useCaseKey] === useCaseFilter);
      if (disasterTypeFilter !== 'all')
        filtered = filtered.filter(
          (i) => i[disasterTypeKey] === disasterTypeFilter
        );

      const tech = radarData.tech.find((t) => t.slug === techFilter);
      if (techFilter && tech)
        filtered = filtered.filter((i) => {
          const itemTechs = i[techKey] as string[];
          return itemTechs.includes(tech.type);
        });
    }

    setDisplayBlips(filtered);
  }, [blips, useCaseFilter, disasterTypeFilter, techFilter]);

  const fillLogic = (blip: BlipType): TechItemType[] => {
    const allItemTechs: TechItemType[] = [];
    radarData.tech.forEach((radarTech) => {
      const itemTechs = blip[techKey] as string[];
      if (itemTechs.includes(radarTech.type)) allItemTechs.push(radarTech);
    });

    if (selectedItem !== null) {
      if (selectedItem.id === blip.id && allItemTechs.length > 0)
        return allItemTechs;
      return [
        {
          color: 'rgba(100,100,100,.5)',
          uuid: v4(),
          type: '',
          slug: '',
          description: ['']
        }
      ];
    }

    if (hoveredItem && hoveredItem.id !== blip.id) {
      return [
        {
          color: 'rgba(100,100,100,.5)',
          uuid: v4(),
          type: '',
          slug: '',
          description: ['']
        }
      ];
    }

    if ((!hoveredItem && techFilter !== 'all') || hoveredItem?.id === blip.id) {
      if (allItemTechs.length > 0) {
        const itemHoveredTech = allItemTechs.find(
          (techItem) => hoveredTech === techItem.slug
        );
        if (hoveredTech === null) return allItemTechs;

        if (itemHoveredTech) {
          return [
            itemHoveredTech,
            ...allItemTechs.splice(allItemTechs.indexOf(itemHoveredTech), 1)
          ];
        }
      }
    }

    // if (allItemTechs.length > 0) return allItemTechs;
    return [
      {
        color: 'rgba(100,100,100,.5)',
        uuid: v4(),
        type: '',
        slug: '',
        description: ['']
      }
    ];
  };

  const getFill = (blip: BlipType, index: number) => {
    const fillings = fillLogic(blip);
    if (fillings[index]) return fillings[index].color;
    return fillings[0].color;
  };

  // Add a div
  const RADAR_TOOLTIP_ID = 'radar-tooltip';
  let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, d3.BaseType> =
    d3.select(`#${RADAR_TOOLTIP_ID}`);
  if (tooltip.empty()) {
    tooltip = d3
      .select('body')
      .append('div')
      .attr('id', RADAR_TOOLTIP_ID)
      .style('opacity', 0);
  }

  return (
    <React.Fragment>
      {displayBlips.map((blip) => (
        <RawBlip
          key={`${blip[titleKey]}-${blip.id}`}
          blip={blip}
          blipSize={blipSize}
          tooltip={tooltip}
          getFill={getFill}
          scaleFactor={scaleFactor}
          selectedItem={selectedItem}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          setSelectedItem={setSelectedItem}
          techKey={techKey}
        />
      ))}
    </React.Fragment>
  );
};

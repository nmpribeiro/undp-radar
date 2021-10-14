/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { v4 } from 'uuid';

import { useRadarState } from '../../stores/RadarProvider';
import { useDataState } from '../../stores/DataProvider';
import { BlipType, QuadrantKey, TechItemType } from '../../types';
import { RadarUtilities } from '../RadarUtilities';

import { RawBlip } from './RawBlip';

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
          const itemTechs = (i[techKey] as string[]) || [];
          return itemTechs.includes(tech.type);
        });
    }

    setDisplayBlips(filtered);
  }, [blips, useCaseFilter, disasterTypeFilter, techFilter]);

  const grey = {
    color: 'rgba(100,100,100,.5)',
    uuid: v4(),
    type: '',
    slug: '',
    description: ['']
  };

  const fillLogic = (blip: BlipType): TechItemType[] => {
    const allItemTechs: TechItemType[] = [];
    radarData.tech.forEach((radarTech) => {
      const itemTechs = (blip[techKey] as string[]) || [];
      if (itemTechs.includes(radarTech.type)) allItemTechs.push(radarTech);
    });

    if (selectedItem !== null) {
      if (selectedItem.id === blip.id && allItemTechs.length > 0)
        return allItemTechs;
      return [grey];
    }

    if ((!hoveredItem && techFilter !== 'all') || hoveredItem?.id === blip.id) {
      if (allItemTechs.length > 0) {
        if (techFilter && !hoveredItem && !hoveredTech) {
          const foundTech = allItemTechs.find(
            (item) => item.slug === techFilter
          );
          if (foundTech) return [foundTech];
          else return [grey];
        }

        if (hoveredTech === null) return allItemTechs;

        const itemHoveredTech = allItemTechs.find(
          (techItem) => hoveredTech === techItem.slug
        );

        if (itemHoveredTech) {
          return [
            itemHoveredTech,
            ...allItemTechs.splice(allItemTechs.indexOf(itemHoveredTech), 1)
          ];
        }
      }
    }

    if (allItemTechs.length > 0 && !techFilter && !hoveredItem && !hoveredTech)
      return allItemTechs;

    return [grey];
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
      .style('opacity', 0)
      .style('position', 'absolute');
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
          titleKey={titleKey}
        />
      ))}
    </React.Fragment>
  );
};

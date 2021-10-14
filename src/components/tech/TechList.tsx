import React, { useEffect, useState } from 'react';

import { Title } from '../shared/Title';
import { TechItemType } from '../../types';
import { ScrollableDiv } from '../shared/ScrollableDiv';
import { useDataState } from '../../stores/DataProvider';
import { useRadarState } from '../../stores/RadarProvider';
import { RadarUtilities } from '../../radar/RadarUtilities';

import { TechItem } from './TechItem';
import './TechList.scss';

export const TechList: React.FC = () => {
  const {
    state: {
      blips,
      radarData,
      techFilter,
      hoveredTech,
      hoveredItem,
      useCaseFilter,
      disasterTypeFilter
    },
    setTechFilter,
    setHoveredTech
  } = useRadarState();

  const {
    state: { keys }
  } = useDataState();

  const [tech, setTech] = useState<TechItemType[]>([]);

  const resetTech = () => setTechFilter(null);

  useEffect(() => {
    if (blips.length > 0) {
      const newTechMap: Map<string, TechItemType> = new Map();
      RadarUtilities.filterBlips(
        blips,
        keys,
        useCaseFilter,
        disasterTypeFilter
      ).forEach((b) => {
        (b[keys.techKey] as string[]).forEach((techy) => {
          const foundTech = radarData.tech.find((t) => t.type === techy);

          if (foundTech && !newTechMap.has(foundTech.slug)) {
            // could be added
            if (
              b[keys.useCaseKey] === useCaseFilter ||
              useCaseFilter === 'all'
            ) {
              (b[keys.techKey] as string[]).forEach((t) => {
                if (t === foundTech.type) newTechMap.set(t, foundTech);
              });
            }
            if (
              b[keys.useCaseKey] === disasterTypeFilter ||
              disasterTypeFilter === 'all'
            ) {
              (b[keys.techKey] as string[]).forEach((t) => {
                if (t === foundTech.type) newTechMap.set(t, foundTech);
              });
            }
          }
        });
      });
      setTech(Array.from(newTechMap.values()));
    }
  }, [blips, radarData, useCaseFilter, disasterTypeFilter]);

  return (
    <div style={{ textAlign: 'end' }}>
      <Title label='Technologies' />
      <ScrollableDiv>
        {tech.map((t) => (
          <TechItem
            key={t.uuid}
            hoveredTech={hoveredTech}
            setHoveredTech={setHoveredTech}
            hoveredItem={hoveredItem}
            tech={t}
            techKey={keys.techKey}
            selected={t.slug === techFilter}
            setTechFilter={setTechFilter}
          />
        ))}
      </ScrollableDiv>
      <button onClick={resetTech} type='button' className={'resetTechButton'}>
        Reset
      </button>
    </div>
  );
};

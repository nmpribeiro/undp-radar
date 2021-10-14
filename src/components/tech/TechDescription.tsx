import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { useRadarState } from '../../stores/RadarProvider';
import { TechItemType } from '../../types';
import { Title } from '../shared/Title';

import './TechDescription.scss';

export const TechOrBlipDescription: React.FC = () => {
  const {
    state: { radarData, techFilter }
  } = useRadarState();

  const [selectedTech, setSelectedTech] = useState<TechItemType>();

  useEffect(() => {
    if (techFilter) {
      const newSelectedTech = radarData.tech.find((t) => techFilter === t.slug);
      if (newSelectedTech) {
        setSelectedTech(newSelectedTech);
      }
    }
  }, [radarData, techFilter]);

  return (
    <React.Fragment>
      {selectedTech && techFilter && (
        <div>
          <Title label={selectedTech.type} type='h4' />
          <div>
            {selectedTech.description.map((text) => (
              <div className={'paragraph'} key={v4()}>
                {text}
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

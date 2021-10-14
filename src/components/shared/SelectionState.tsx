import React from 'react';

import { useRadarState } from '../../stores/RadarProvider';
import { BlipType } from '../../types';

interface Props {
  children?: (props: {
    selectedItem: BlipType | null;
    selectedQuadrant: string | null;
    // selectedTech: string | null
    logic: {
      setSelectedQuadrant: (payload: string | null) => void;
      setSelectedItem: (payload: BlipType | null) => void;
    };
  }) => React.ReactNode;
}

export const SelectionState: React.FC<Props> = ({ children }) => {
  const {
    state: { selectedItem, selectedQuadrant },
    setSelectedQuadrant,
    setSelectedItem
  } = useRadarState();

  return (
    <React.Fragment>
      {children &&
        children({
          selectedItem,
          selectedQuadrant,
          logic: {
            setSelectedQuadrant,
            setSelectedItem
          }
        })}
    </React.Fragment>
  );
};

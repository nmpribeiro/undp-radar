import React from 'react';
import { useDataState } from '../../stores/DataProvider';

import { useRadarState } from '../../stores/RadarProvider';
import {
  BlipType,
  KeysObject,
  PriorityType,
  RadarOptionsType
} from '../../types';

interface Props {
  children?: (props: {
    selectedItem: BlipType | null;
    selectedQuadrant: string | null;
    keys: KeysObject;
    priorityOrders: PriorityType;
    radarData: RadarOptionsType;
    radarOptions: RadarOptionsType;
    // selectedTech: string | null
    logic: {
      setSelectedQuadrant: (payload: string | null) => void;
      setSelectedItem: (payload: BlipType | null) => void;
    };
  }) => React.ReactNode;
}

export const SelectionState: React.FC<Props> = ({ children }) => {
  const {
    state: { selectedItem, selectedQuadrant, radarData },
    setSelectedQuadrant,
    setSelectedItem
  } = useRadarState();

  const {
    state: { keys, priorityOrders, radarOptions }
  } = useDataState();

  return (
    <React.Fragment>
      {children &&
        children({
          selectedItem,
          selectedQuadrant,
          logic: {
            setSelectedQuadrant,
            setSelectedItem
          },
          keys,
          priorityOrders,
          radarData,
          radarOptions
        })}
    </React.Fragment>
  );
};

import React, { useEffect } from 'react';

import { KeysObject, RadarOptionsType } from '../types';

import { useDataState } from '../stores/DataProvider';

interface Props {
  keys: KeysObject;
  radarConf?: Partial<RadarOptionsType>;
}

export const SetData: React.FC<Props> = ({ keys, radarConf }) => {
  const { setKeys, setRadarConf } = useDataState();

  useEffect(() => {
    // console.log('settings keys: ', keys);
    setKeys(keys);
  }, [keys]);

  useEffect(() => {
    // console.log('setting radarConf: ', radarConf);
    if (radarConf) setRadarConf(radarConf);
  }, [radarConf]);

  return <React.Fragment />;
};

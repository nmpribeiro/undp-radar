/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AnyAction, ProcessAction, StoreModule } from 'kiss-react-state';
import { RADAR_OPTIONS } from '../../constants/RadarData';
import {
  DisasterTypeKey,
  HorizonKey,
  KeysObject,
  PriorityType,
  QuadrantKey,
  RadarOptionsType,
  TechKey,
  TitleKey,
  UseCaseKey
} from '../../types';

export interface DataState {
  keys: KeysObject;
  priorityOrders: PriorityType;
  radarOptions: RadarOptionsType;
}

export enum ActionType {
  SET_TECH_KEY = 'SET_TECH_KEY',
  SET_TITLE_KEY = 'SET_TITLE_KEY',
  SET_USE_CASE_KEY = 'SET_USE_CASE_KEY',
  SET_DISASTER_TYPE_KEY = 'SET_DISASTER_TYPE_KEY',
  SET_HORIZON_KEY = 'SET_HORIZON_KEY',
  SET_QUADRANT_KEY = 'SET_QUADRANT_KEY',
  SET_PRIORITY_HORIZON_ORDER = 'SET_PRIORITY_HORIZON_ORDER',
  SET_PRIORITY_QUADRANT_ORDER = 'SET_PRIORITY_QUADRANT_ORDER',
  SET_RADAR_OPTIONS = 'SET_RADAR_OPTIONS',
  RESET = 'RESET'
}

// TODO: setters for these
const horizonPriorityOrder: Record<HorizonKey, number> = {
  production: 1,
  validation: 2,
  prototype: 3,
  idea: 4
};
const quadrantPriorityOrder: Record<QuadrantKey, number> = {
  response: 1,
  recovery: 2,
  resilience: 3,
  preparedness: 4
};

const HORIZONS_KEY = 'Status/Maturity';
const QUADRANT_KEY = 'Disaster Cycle';
const TITLE_KEY = 'Ideas/Concepts/Examples';
const TECH_KEY = 'Technology';
const USE_CASE_KEY = 'Use Case';
const DISASTER_TYPE_KEY = 'Un Host Organisation';

export const dataState = new StoreModule<ActionType, DataState>('', {
  keys: {
    techKey: TECH_KEY,
    useCaseKey: USE_CASE_KEY,
    disasterTypeKey: DISASTER_TYPE_KEY,
    titleKey: TITLE_KEY,
    quadrantKey: QUADRANT_KEY,
    horizonKey: HORIZONS_KEY
  },
  priorityOrders: {
    horizon: horizonPriorityOrder,
    quadrant: quadrantPriorityOrder
  },
  radarOptions: RADAR_OPTIONS
});

/**
 * Exportable Actions
 */
const setRadarOptions = dataState.setPayloadAction<Partial<RadarOptionsType>>(
  ActionType.SET_RADAR_OPTIONS,
  (state, action) => ({
    ...state,
    radarOptions: {
      ...state.radarOptions,
      ...action.payload
    }
  })
);
const setTechKey = dataState.setPayloadAction<TechKey>(
  ActionType.SET_TECH_KEY,
  (state, action) => ({
    ...state,
    keys: {
      ...state.keys,
      techKey: action.payload
    }
  })
);
const setTitleKey = dataState.setPayloadAction<TitleKey>(
  ActionType.SET_TITLE_KEY,
  (state, action) => ({
    ...state,
    keys: {
      ...state.keys,
      titleKey: action.payload
    }
  })
);
const setHorizonKey = dataState.setPayloadAction<HorizonKey>(
  ActionType.SET_HORIZON_KEY,
  (state, action) => ({
    ...state,
    keys: {
      ...state.keys,
      horizonKey: action.payload
    }
  })
);
const setQuadrantKey = dataState.setPayloadAction<QuadrantKey>(
  ActionType.SET_QUADRANT_KEY,
  (state, action) => ({
    ...state,
    keys: {
      ...state.keys,
      quadrantKey: action.payload
    }
  })
);

const setUseCaseKey = dataState.setPayloadAction<UseCaseKey>(
  ActionType.SET_USE_CASE_KEY,
  (state, action) => ({
    ...state,
    keys: {
      ...state.keys,
      useCaseKey: action.payload
    }
  })
);

const setDisasterTypeKey = dataState.setPayloadAction<DisasterTypeKey>(
  ActionType.SET_DISASTER_TYPE_KEY,
  (state, action) => ({
    ...state,
    keys: {
      ...state.keys,
      disasterTypeKey: action.payload
    }
  })
);

const reset = dataState.setSimpleAction(
  ActionType.RESET,
  () => dataState.initialState
);

// /**
//  * Thunks
//  */
type DataProcess<R> = ProcessAction<R, DataState, null, AnyAction>;

type SetKeysProcess = (keys: Partial<KeysObject>) => DataProcess<void>;
const setKeys: SetKeysProcess = (keys) => (dispatch) => {
  const {
    techKey,
    titleKey,
    horizonKey,
    quadrantKey,
    useCaseKey,
    disasterTypeKey
  } = keys;
  if (techKey) dispatch(setTechKey(techKey));
  if (titleKey) dispatch(setTitleKey(titleKey));
  if (horizonKey) dispatch(setHorizonKey(horizonKey));
  if (quadrantKey) dispatch(setQuadrantKey(quadrantKey));
  if (useCaseKey) dispatch(setUseCaseKey(useCaseKey));
  if (disasterTypeKey) dispatch(setDisasterTypeKey(disasterTypeKey));
};

type SetRadarConfProcess = (
  conf: Partial<RadarOptionsType>
) => DataProcess<void>;
const setRadarConf: SetRadarConfProcess = (conf) => (dispatch) =>
  dispatch(setRadarOptions(conf));

export const actions = {
  // setTechKey,
  // setTitleKey,
  // setHorizonKey,
  // setQuadrantKey,
  // setUseCaseKey,
  // setDisasterTypeKey,

  setKeys,
  setRadarConf,
  reset
  // testAsync,
};

import { AnyAction, ProcessAction, StoreModule } from 'kiss-react-state';

import {
  BaseCSVType,
  BlipType,
  MappingType,
  QuadrantKey,
  RadarOptionsType,
  RawBlipType
} from '../../types';
import { CSVManager, getCSVFileFromUrl } from '../../services/CSVManager';
import { Utilities } from '../../helpers/Utilities';

export enum ActionType {
  SET_BLIPS = 'RADAR/SET_BLIPS',
  SET_RAW_BLIPS = 'RADAR/SET_RAW_BLIPS',
  SET_RADAR_DATA = 'RADAR/SET_RADAR_DATA',
  SET_IS_FILTER = 'RADAR/SET_IS_FILTER',
  SET_USE_CASE_FILTER = 'RADAR/SET_USE_CASE_FILTER',
  SET_DISASTER_TYPE_FILTER = 'RADAR/SET_DISASTER_TYPE_FILTER',
  SET_TECH_FILTER = 'RADAR/SET_TECH_FILTER',
  SET_SELECTED_ITEM = 'RADAR/SET_SELECTED_ITEM',
  SET_HOVERED_ITEM = 'RADAR/SET_HOVERED_ITEM',
  SET_HOVERED_TECH = 'RADAR/SET_HOVERED_TECH',
  SET_SELECTED_QUADRANT = 'RADAR/SET_SELECTED_QUADRANT',
  RESET = 'RADAR/RESET'
}

export interface RadarState {
  radarData: RadarOptionsType;
  rawBlips: RawBlipType[];
  blips: BlipType[];
  isFiltered: boolean;
  useCaseFilter: string;
  disasterTypeFilter: string;
  techFilter: string | null;
  selectedItem: BlipType | null;
  hoveredItem: BlipType | null;
  hoveredTech: string | null;
  selectedQuadrant: QuadrantKey | null;
}

export const radarModule = new StoreModule<ActionType, RadarState>('', {
  radarData: {
    title: '',
    width: 0,
    height: 0,
    quadrants: [],
    horizons: [],
    radarOptions: {
      horizonShiftRadius: 0,
      radiusPadding: 0,
      circlePadding: 0
    },
    tech: []
  },
  rawBlips: [],
  blips: [],
  isFiltered: false,
  useCaseFilter: 'all',
  disasterTypeFilter: 'all',
  techFilter: null,
  selectedItem: null,
  hoveredItem: null,
  hoveredTech: null,
  selectedQuadrant: null
});

/**
 * Exportable Actions
 */
const setBlips = radarModule.setPayloadAction<BlipType[]>(
  ActionType.SET_BLIPS,
  (state, action) => ({
    ...state,
    blips: action.payload
  })
);

const setRawBlips = radarModule.setPayloadAction<RawBlipType[]>(
  ActionType.SET_RAW_BLIPS,
  (state, action) => ({
    ...state,
    rawBlips: action.payload
  })
);

const setRadarData = radarModule.setPayloadAction<RadarOptionsType>(
  ActionType.SET_RADAR_DATA,
  (state, action) => ({
    ...state,
    radarData: action.payload
  })
);

const setIsFilter = radarModule.setPayloadAction<boolean>(
  ActionType.SET_IS_FILTER,
  (state, action) => ({
    ...state,
    isFiltered: action.payload
  })
);

const setUseCaseFilter = radarModule.setPayloadAction<string>(
  ActionType.SET_USE_CASE_FILTER,
  (state, action) => ({
    ...state,
    useCaseFilter: action.payload
  })
);

const setDisasterTypeFilter = radarModule.setPayloadAction<string>(
  ActionType.SET_DISASTER_TYPE_FILTER,
  (state, action) => ({
    ...state,
    disasterTypeFilter: action.payload
  })
);

const setTechFilter = radarModule.setPayloadAction<string | null>(
  ActionType.SET_TECH_FILTER,
  (state, action) => ({
    ...state,
    techFilter: action.payload
  })
);

const setSelectedItem = radarModule.setPayloadAction<BlipType | null>(
  ActionType.SET_SELECTED_ITEM,
  (state, action) => ({
    ...state,
    selectedItem: action.payload
  })
);

const setHoveredItem = radarModule.setPayloadAction<BlipType | null>(
  ActionType.SET_HOVERED_ITEM,
  (state, action) => ({
    ...state,
    hoveredItem: action.payload
  })
);

const setHoveredTech = radarModule.setPayloadAction<string | null>(
  ActionType.SET_HOVERED_TECH,
  (state, action) => ({
    ...state,
    hoveredTech: action.payload
  })
);

const setSelectedQuadrant = radarModule.setPayloadAction<QuadrantKey | null>(
  ActionType.SET_SELECTED_QUADRANT,
  (state, action) => ({ ...state, selectedQuadrant: action.payload })
);

const reset = radarModule.setSimpleAction(
  ActionType.RESET,
  () => radarModule.initialState
);

/**
 * Thunks
 */
type RadarThunks<R> = ProcessAction<R, RadarState, null, AnyAction>;

type FetchRadarDataThunk = (
  content: string,
  mapping: MappingType<RawBlipType>
) => RadarThunks<void>;
const fetchRadarBlips: FetchRadarDataThunk =
  (content, mapping) => async (dispatch) => {
    const radarCSV = await getCSVFileFromUrl(content);
    const rawBlips = new CSVManager(radarCSV).processCSV<BaseCSVType>();
    const cleanedRawBlips = Utilities.cleanRawBlips(rawBlips, mapping);
    setRawBlips(cleanedRawBlips);
    dispatch(setRawBlips(cleanedRawBlips));
  };

export const actions = {
  setBlips,
  setRawBlips,
  setRadarData,
  setIsFilter,
  setUseCaseFilter,
  setDisasterTypeFilter,
  setTechFilter,
  setSelectedItem,
  setHoveredItem,
  setHoveredTech,
  setSelectedQuadrant,
  reset,
  // testAsync,
  fetchRadarBlips
};

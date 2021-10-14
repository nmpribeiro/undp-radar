import { StoreModule } from 'kiss-react-state';
import {
  DisasterTypeKey,
  HorizonKey,
  PriorityOrderType,
  QuadrantKey,
  TechKey,
  TitleKey,
  UseCaseKey
} from '../../types';

export interface DataState {
  keys: {
    techKey: TechKey;
    useCaseKey: UseCaseKey;
    disasterTypeKey: DisasterTypeKey;
    titleKey: TitleKey;
    horizonKey: HorizonKey;
    quadrantKey: QuadrantKey;
  };
  priorityOrders: {
    horizon: PriorityOrderType;
    quadrant: PriorityOrderType;
  };
}

export enum ActionType {
  SET_TECH_KEY = 'SET_TECH_KEY',
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
  }
});

/**
 * Exportable Actions
 */
const setTechKey = dataState.setPayloadAction<TechKey>(
  ActionType.SET_TECH_KEY,
  (state, action) => ({
    ...state,
    techKey: action.payload
  })
);

const reset = dataState.setSimpleAction(
  ActionType.RESET,
  () => dataState.initialState
);

// /**
//  * Thunks
//  */
// type AppThunks<R> = ProcessAction<R, DataState, null, AnyAction>;

// type TestAyncThunk = (amount: number) => AppThunks<boolean>;
// const testAsync: TestAyncThunk = (amount) => (dispatch) => {
//   setTimeout(() => dispatch(increment(amount)), 1000);
//   return true;
// };

export const actions = {
  setTechKey,
  // increment,
  // decrement,
  reset
  // testAsync,
};

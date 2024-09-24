import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
} from './training.actions';
import { Exercise } from '../models/exercise';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

// Because training module is laoded lazily, we cant do this there
export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload,
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload,
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {
          ...state.availableExercises.find(
            (exer) => exer.id === action.payload
          ),
        },
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      };
    default:
      return state;
  }
}

const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);

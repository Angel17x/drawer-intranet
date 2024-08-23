import { StateActions } from "../enums";

export interface IReducerAction {
  type: StateActions;
  payload: any;
}

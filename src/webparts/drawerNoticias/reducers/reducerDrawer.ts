import { StateActions } from "../enums";
import { IReducerAction, IReducerState } from "../interfaces";

export const reducerDrawer = (
  state: IReducerState,
  action: IReducerAction
): IReducerState => {
  switch (action.type) {
    case StateActions.SELECTED_LIST:
      return {
        ...state,
        loading: false,
        error: undefined,
        selectedListId: action.payload,
      };
    case StateActions.LOADING:
      return {
        ...state,
        loading: true,
      };
    case StateActions.SET_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case StateActions.SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case StateActions.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload ?? "Hubo un problema al obtener las categorías",
      };
    default:
      return state;
  }
};

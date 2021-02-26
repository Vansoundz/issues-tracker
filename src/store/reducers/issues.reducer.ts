import { TAction } from "../../models/issue.model";
import { TYPES } from "../types";
import { IssuesReducer } from "../types/reducerTypes";

const initState: IssuesReducer = { filters: {} };

const issuesReducer = (state = initState, action: TAction): IssuesReducer => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.issues.FILTER:
      return { ...state, filters: { ...state.filters, ...payload } };
    case TYPES.issues.CLEAR_FILTERS:
      return {
        ...state,
        filters: {},
      };
    default:
      return state;
  }
};

export default issuesReducer;

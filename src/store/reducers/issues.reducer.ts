import { TAction } from "../../models/issue.model";
import { TYPES } from "../types";
import { IssuesReducer } from "../types/reducerTypes";

const initState: IssuesReducer = {
  filters: {},
  showSearch: false,
  editIssue: false,
};

const issuesReducer = (state = initState, action: TAction): IssuesReducer => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.issues.FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          // @ts-ignore
          ...payload,
        },
      };
    case TYPES.issues.CLEAR_FILTERS:
      return {
        ...state,
        filters: {},
      };
    case TYPES.issues.SHOW_SEARCH:
      return {
        ...state,
        // @ts-ignore
        showSearch: payload,
      };
    case TYPES.issues.SELECT_ISSUE:
      return {
        ...state,
        // @ts-ignore
        issue: payload,
      };
    case TYPES.issues.SET_EDIT_ISSUE:
      return {
        ...state,
        // @ts-ignore
        editIssue: payload,
      };

    default:
      return state;
  }
};

export default issuesReducer;

import { combineReducers, createStore } from "redux";
import authReducer from "./reducers/auth.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import issuesReducer from "./reducers/issues.reducer";

const reducer = combineReducers({
  auth: authReducer,
  issues: issuesReducer,
});

export type RootState = ReturnType<typeof reducer>;
export default createStore(reducer, composeWithDevTools());

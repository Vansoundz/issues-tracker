import { combineReducers, createStore } from "redux";
import authReducer from "./reducers/auth.reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof reducer>;
export default createStore(reducer, composeWithDevTools());

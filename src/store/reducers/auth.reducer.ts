import { TYPES } from "../types";
import { AuthReducer } from "../types/reducers";

const initState: AuthReducer = { isLoggedIn: false, loading: true };

const authReducer = (state = initState, action: any): AuthReducer => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.auth.LOGIN:
      return { ...state, isLoggedIn: true, user: payload, loading: false };
    case TYPES.auth.STOP:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default authReducer;

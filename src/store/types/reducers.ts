import { User } from "../../models/user.model";

interface AuthReducer {
  isLoggedIn: boolean;
  loading: boolean;
  user?: User;
}

export type { AuthReducer };

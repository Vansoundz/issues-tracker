import { IssueFilters } from "../../models/issue.model";
import { User } from "../../models/user.model";

interface AuthReducer {
  isLoggedIn: boolean;
  loading: boolean;
  user?: User;
}

interface IssuesReducer {
  filters: IssueFilters;
}

export type { AuthReducer, IssuesReducer };

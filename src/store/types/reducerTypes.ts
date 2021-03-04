import { Issue, IssueFilters } from "../../models/issue.model";
import { User } from "../../models/user.model";

interface AuthReducer {
  isLoggedIn: boolean;
  loading: boolean;
  user?: User;
}

interface IssuesReducer {
  filters: IssueFilters;
  showSearch: boolean;
  issue?: Issue;
  editIssue: boolean;
  issues?: Issue[];
}

export type { AuthReducer, IssuesReducer };

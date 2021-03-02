import { User } from "./user.model";

interface Comment {
  author: User;
  body: string;
  id: string;
}

interface Issue {
  id: string;
  title: string;
  body: string;
  closed: boolean;
  author: User;
  assignees: {
    totalCount: number;
    nodes: User[];
  };
  labels: {
    totalCount: number;
    nodes: {
      color: string;
      name: string;
    }[];
  };
  comments: {
    totalCount: number;
    nodes: Comment[];
  };
}

interface IssueFilters {
  assignee?: string;
  createdBy?: string;
  labels?: string[];
  mentioned?: string;
  states?: ("OPEN" | "CLOSED")[];
}

type TAction = {
  type: string;
  payload: IssueFilters | boolean;
};

export type { Issue, IssueFilters, TAction, Comment };

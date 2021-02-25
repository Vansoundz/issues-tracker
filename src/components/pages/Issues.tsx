import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Issue } from "../../models/issue.model";
import { RootState } from "../../store";
import Loading from "../layout/Loading";
import IssueComponent from "../utils/Issue";
import "./pages.css";

interface IssueFilters {
  assignee?: string;
  createdBy?: string;
  labels?: string[];
  mentioned?: string;
  states?: ("OPEN" | "CLOSED")[];
}

export const ISSUES = gql`
  query Issues($filters: IssueFilters!) {
    viewer {
      issues(first: 10, filterBy: $filters) {
        totalCount
        nodes {
          id
          title
          body
          closed
          author {
            login
          }
          assignees(first: 5) {
            totalCount
            nodes {
              login
            }
          }
          labels(first: 5) {
            totalCount
            nodes {
              color
              name
            }
          }
          comments(first: 10) {
            nodes {
              author {
                login
                avatarUrl
              }
              body
              id
            }
            totalCount
          }
        }
      }
    }
  }
`;

const SEARCH = gql`
  query SearchQuery($query: String!) {
    search(query: $query, type: ISSUE, first: 10) {
      issueCount
      nodes {
        ... on Issue {
          id
          body
          closed
          author {
            login
          }
          assignees(first: 5) {
            totalCount
            nodes {
              login
            }
          }
          labels(first: 5) {
            totalCount
            nodes {
              color
              name
            }
          }
          comments(first: 10) {
            nodes {
              author {
                login
                avatarUrl
              }
              body
              id
            }
            totalCount
          }
          title
        }
      }
    }
  }
`;

const Issues = () => {
  const [filters, setFilters] = useState<IssueFilters>({});
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const { loading, data, error, refetch } = useQuery(ISSUES, {
    variables: { filters },
  });
  const [showSearch, setShowsearch] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const { loading: searching, data: searchData } = useQuery(SEARCH, {
    variables: { query },
  });

  useEffect(() => {
    if (data && data.viewer?.issues?.nodes) {
      setIssues(data.viewer?.issues?.nodes);
    }

    // console.log(searchData);
    if (showSearch)
      if (searchData && searchData.search?.nodes) {
        setIssues(searchData.search?.nodes);
      }
  }, [data, searchData, showSearch]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (filters.states?.length === 0) {
      setFilters({ ...filters, states: ["OPEN", "CLOSED"] });
    }
  }, [filters, filters.states]);

  return (
    <div className="issues">
      {(loading || searching) && <Loading />}

      <div className="filters">
        <div className="add-filter dropdown-container">
          <button
            onClick={() => {
              const el = document.getElementById("filter-drop");
              if (!el) return;
              el.style.transform = "scale(1)";
            }}
            onBlur={() => {
              const el = document.getElementById("filter-drop");
              if (!el) return;
              setTimeout(() => (el.style.transform = "scale(0)"), 100);
            }}
          >
            Add filter
          </button>
          <div
            id="filter-drop"
            className="query-filter dropdown"
            onClick={() => setShowsearch(false)}
          >
            <h4>Filter by</h4>
            <ul>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    assignee: filters.assignee ? undefined : "vansoundz",
                  });
                }}
              >
                <span> {filters.assignee ? <>&#10004;</> : ""}</span>{" "}
                <span>Assigned to me</span>
              </li>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    createdBy: filters.createdBy ? undefined : "vansoundz",
                  });
                }}
              >
                <span>{filters.createdBy ? <>&#10004;</> : ""}</span>{" "}
                <span>Created by me</span>
              </li>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    states: filters.states?.includes("OPEN")
                      ? filters.states.filter((s) => s !== "OPEN")
                      : filters.states
                      ? [...filters.states, "OPEN"]
                      : [],
                  });
                }}
              >
                <span>
                  {filters.states?.includes("OPEN") ? <>&#10004;</> : ""}
                </span>{" "}
                <span>Open</span>
              </li>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    states: filters.states?.includes("CLOSED")
                      ? filters.states.filter((s) => s !== "CLOSED")
                      : filters.states
                      ? [...filters.states, "CLOSED"]
                      : [],
                  });
                }}
              >
                <span>
                  {filters.states?.includes("CLOSED") ? <>&#10004;</> : ""}
                </span>{" "}
                <span>Closed</span>
              </li>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    mentioned: filters.mentioned ? undefined : "vansoundz",
                  });
                }}
              >
                <span>{filters.mentioned ? <>&#10004;</> : ""}</span>{" "}
                <span>Mentioned</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="search">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (search?.length > 3) {
                setShowsearch(true);
                setQuery(`user:${user?.login} in:title ${search}`);
              }
            }}
          >
            <input
              type="search"
              onChange={(e) => {
                if (e.target.value.length <= 3) {
                  setShowsearch(false);
                }
                setSearch(e.target.value);
              }}
              placeholder="Search issues"
              id="search"
            />
          </form>
        </div>
      </div>
      <div className="table">
        <div className="header">
          <div className="th-item"></div>
          <div className="th-item">Assignee</div>
          <div className="th-item">Author</div>
          <div className="th-item">Label</div>
        </div>
        {issues.length > 0 ? (
          <div className="table-body">
            {issues.map((issue) => (
              <IssueComponent {...issue} refetch={refetch} key={issue.id} />
            ))}
          </div>
        ) : (
          <>
            <div className="show">
              {showSearch ? (
                <h4>There are no issues matching that term</h4>
              ) : (
                <h4>You have no issues</h4>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Issues;

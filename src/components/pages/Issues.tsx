import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Issue } from "../../models/issue.model";
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

const ISSUES = gql`
  query Issues($filters: IssueFilters!) {
    viewer {
      issues(first: 10, filterBy: $filters) {
        totalCount
        nodes {
          id
          title
          body
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
          comments(first: 5) {
            totalCount
          }
        }
      }
    }
  }
`;

const Issues = () => {
  const [filters, setFilters] = useState<IssueFilters>({});

  const { loading, data, error } = useQuery(ISSUES, {
    variables: { filters },
  });
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    if (data && data.viewer?.issues?.nodes) {
      setIssues(data.viewer?.issues?.nodes);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <div className="issues">
      {loading && <Loading />}
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
          <div id="filter-drop" className="query-filter dropdown">
            <h4>Filter by</h4>
            <ul>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    assignee: filters.assignee ? "vansoundz" : undefined,
                  });
                }}
              >
                <span></span> <span>Assigned to me</span>
              </li>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    createdBy: filters.createdBy ? "vansoundz" : undefined,
                  });
                }}
              >
                <span></span> <span>Created by me</span>
              </li>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    states: ["OPEN"],
                  });
                }}
              >
                <span></span> <span>Open</span>
              </li>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    states: ["CLOSED"],
                  });
                }}
              >
                <span></span> <span>Closed</span>
              </li>
              <li
                onClick={() => {
                  setFilters({
                    ...filters,
                    mentioned: filters.mentioned ? "vansoundz" : undefined,
                  });
                }}
              >
                <span></span> <span>Mentioned</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="search">
          <input type="search" placeholder="Search issues" id="search" />
        </div>
      </div>
      <div className="table">
        <div className="header">
          <div className="th-item"></div>
          <div className="th-item">Assignee</div>
          <div className="th-item">Author</div>
          <div className="th-item">Label</div>
        </div>
        <div className="table-body">
          {issues.map((issue) => (
            <IssueComponent {...issue} key={issue.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Issues;

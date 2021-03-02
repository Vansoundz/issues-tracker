import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ISSUES, SEARCH } from "../../graphql/queries";
import { Issue } from "../../models/issue.model";
import { RootState } from "../../store";
import { TYPES } from "../../store/types";
import Loading from "../layout/Loading";
import CreateIssue from "../utils/CreateIssue";
import EditIssue from "../utils/EditIssue";
import Filter from "../utils/Filter";
import IssueComponent from "../utils/Issue";
import "./pages.css";

const Issues = () => {
  // const [filters, setFilters] = useState<IssueFilters>({});

  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const { filters, showSearch, issue } = useSelector(
    (state: RootState) => state.issues
  );

  const dispatch = useDispatch();
  const { loading, error, refetch } = useQuery(ISSUES, {
    variables: { filters },
    onCompleted: (data) => {
      console.log(data);
      setIssues(data.viewer?.issues?.nodes);
    },
  });

  const [open, setOpen] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const { loading: searching } = useQuery(SEARCH, {
    variables: { query },
    onCompleted: (data) => {
      if (showSearch) setIssues(data.search?.nodes);
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <div className="issues">
      {(loading || searching) && <Loading />}
      <CreateIssue open={open} close={() => setOpen(!open)} refetch={refetch} />
      <EditIssue refetch={refetch} {...issue} />

      <div className="filters" style={{ justifyContent: "space-between" }}>
        <div>
          <button className="btn-border" onClick={() => setOpen(!open)}>
            Create Issue
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="add-filter dropdown-container">
            <button
              className="btn-border flex align-center"
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
              <span>
                <i style={{ fontSize: 14 }} className="material-icons">
                  filter_alt
                </i>
              </span>{" "}
              <span> Add filter</span>
            </button>
            <Filter />
          </div>
          <div>
            <button
              onClick={() => dispatch({ type: TYPES.issues.CLEAR_FILTERS })}
            >
              Clear Filters
            </button>
          </div>
          <div className="search">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (search?.length > 3) {
                  dispatch({ type: TYPES.issues.SHOW_SEARCH, payload: true });
                  setQuery(`user:${user?.login} in:title ${search}`);
                }
              }}
            >
              <input
                type="search"
                onChange={(e) => {
                  if (e.target.value.length <= 3) {
                    dispatch({
                      type: TYPES.issues.SHOW_SEARCH,
                      payload: false,
                    });
                  }
                  setSearch(e.target.value);
                }}
                placeholder="Search issues"
                id="search"
              />
            </form>
          </div>
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
              <IssueComponent {...issue} key={issue.id} />
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

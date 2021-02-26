import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { TYPES } from "../../store/types";

const Filter: FC<{
  setShowsearch: (value: React.SetStateAction<boolean>) => void;
}> = ({ setShowsearch }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.issues);

  return (
    <div
      id="filter-drop"
      className="query-filter dropdown"
      onClick={() => setShowsearch(false)}
    >
      <h4>Filter by</h4>
      <ul>
        <li
          onClick={() => {
            dispatch({
              type: TYPES.issues.FILTER,
              payload: {
                assignee: filters.assignee ? undefined : "vansoundz",
              },
            });
          }}
        >
          <span> {filters.assignee ? <>&#10004;</> : ""}</span>{" "}
          <span>Assigned to me</span>
        </li>
        <li
          onClick={() => {
            dispatch({
              type: TYPES.issues.FILTER,
              payload: {
                createdBy: filters.createdBy ? undefined : "vansoundz",
              },
            });
          }}
        >
          <span>{filters.createdBy ? <>&#10004;</> : ""}</span>{" "}
          <span>Created by me</span>
        </li>
        <li
          onClick={() => {
            dispatch({
              type: TYPES.issues.FILTER,
              payload: { states: ["OPEN"] },
            });
          }}
        >
          <span>{filters.states?.includes("OPEN") ? <>&#10004;</> : ""}</span>{" "}
          <span>Open</span>
        </li>
        <li
          onClick={() => {
            dispatch({
              type: TYPES.issues.FILTER,
              payload: { states: ["CLOSED"] },
            });
          }}
        >
          <span>{filters.states?.includes("CLOSED") ? <>&#10004;</> : ""}</span>{" "}
          <span>Closed</span>
        </li>
        <li
          onClick={() => {
            dispatch({
              type: TYPES.issues.FILTER,
              payload: { states: ["CLOSED", "OPEN"] },
            });
          }}
        >
          <span>{filters.states?.length === 2 ? <>&#10004;</> : ""}</span>{" "}
          <span>All (open and closed)</span>
        </li>
        <li
          onClick={() => {
            dispatch({
              type: TYPES.issues.FILTER,
              payload: {
                mentioned: filters.mentioned ? undefined : "vansoundz",
              },
            });
          }}
        >
          <span>{filters.mentioned ? <>&#10004;</> : ""}</span>{" "}
          <span>Mentioned</span>
        </li>
      </ul>
    </div>
  );
};

export default Filter;

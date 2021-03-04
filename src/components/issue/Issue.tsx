import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Issue as IssueModel } from "../../models/issue.model";
import { TYPES } from "../../store/types";
import Label from "../utils/Label";

const IssueComponent: FC<IssueModel> = (issue) => {
  const dispatch = useDispatch();

  const {
    title,
    comments: { totalCount },
    author: { login, avatarUrl },
    labels,
    assignees: { nodes, totalCount: numOfPeople },
  } = issue;

  return (
    <div className="issue-entry">
      <div className="tb-item">
        <div
          className="issue"
          onClick={() => {
            dispatch({ type: TYPES.issues.SELECT_ISSUE, payload: issue.id });
            dispatch({ type: TYPES.issues.SET_EDIT_ISSUE, payload: true });
          }}
        >
          <h4>{title}</h4>
          <small>
            {/* {" "}
            {totalCount ? totalCount : "no"} comment
            {totalCount !== 1 ? "s" : ""} */}
            {totalCount > 0 ? (
              <span style={{ marginTop: 8 }}>
                <span>{totalCount}</span>{" "}
                <i style={{ fontSize: 16 }} className="material-icons">
                  chat_bubble_outline
                </i>
              </span>
            ) : (
              <div></div>
            )}
          </small>
        </div>
      </div>
      <div className="tb-item">
        <div className="stack">
          {nodes[numOfPeople - 1]?.avatarUrl && (
            <>
              {/* <div className="stack-el"> */}
              {Array(numOfPeople)
                .fill(0)
                .map((_, i) => {
                  return (
                    <img
                      key={i}
                      className="usr-image"
                      title={nodes[numOfPeople - 1].login}
                      width={20}
                      height={20}
                      style={{
                        zIndex: i,
                        left: i * 4,
                      }}
                      src={nodes[numOfPeople - 1].avatarUrl}
                      alt={nodes[numOfPeople - 1].login}
                    />
                  );
                })}
              {/* </div> */}
            </>
          )}
        </div>
      </div>
      <div className="tb-item">
        {avatarUrl && (
          <img
            className="usr-image"
            title={login}
            width={20}
            height={20}
            src={avatarUrl}
            alt={login}
          />
        )}
      </div>
      <div className="tb-item">
        <Label {...labels} />
      </div>
    </div>
  );
};

export default IssueComponent;

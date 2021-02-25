import React, { FC } from "react";
import { Issue as IssueModel } from "../../models/issue.model";
import Label from "./Label";

const IssueComponent: FC<IssueModel> = (issue) => {
  const {
    title,
    comments: { totalCount },
    author: { login },
    labels,
  } = issue;
  return (
    <div className="issue-entry">
      <div className="tb-item">
        <div className="issue">
          <h4>{title}</h4>
          <small> {totalCount ? totalCount : "no"} comments</small>
        </div>
      </div>
      <div className="tb-item"></div>
      <div className="tb-item">{login}</div>
      <div className="tb-item">
        <Label {...labels} />
      </div>
    </div>
  );
};

export default IssueComponent;

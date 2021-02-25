import React, { FC, useState } from "react";
import { Issue as IssueModel } from "../../models/issue.model";
import Label from "./Label";
import Modal from "../utils/Modal";

const IssueComponent: FC<IssueModel> = (issue) => {
  const {
    title,
    comments: { totalCount },
    author: { login },
    labels,
    assignees: { nodes, totalCount: numOfPeople },
  } = issue;
  const [open, setOpen] = useState(false);

  return (
    <div className="issue-entry">
      <Modal
        open={open}
        close={() => {
          setOpen(!open);
        }}
      >
        <h4>{title}</h4>
      </Modal>
      <div className="tb-item">
        <div className="issue" onClick={() => setOpen(!open)}>
          <h4>{title}</h4>
          <small>
            {" "}
            {totalCount ? totalCount : "no"} comment
            {totalCount !== 1 ? "s" : ""}
          </small>
        </div>
      </div>
      <div className="tb-item">
        {numOfPeople > 0 ? nodes[numOfPeople - 1].login : ""}
      </div>
      <div className="tb-item">{login}</div>
      <div className="tb-item">
        <Label {...labels} />
      </div>
    </div>
  );
};

export default IssueComponent;

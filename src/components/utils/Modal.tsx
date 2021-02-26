import { ApolloQueryResult } from "@apollo/client";
import React, { FC } from "react";
import { IssueFilters } from "../../models/issue.model";
import { usePreventScroll } from "../../utils/hooks";

export interface IModal {
  open: boolean;
  close: () => void;
  refetch?: (
    variables?:
      | Partial<{
          filters: IssueFilters;
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>;
}

const Modal: FC<IModal> = ({ children, close, open }) => {
  usePreventScroll(open);

  return (
    <div
      className="modal"
      style={{ height: open ? "100vh" : "0" }}
      // style={{ transform: open ? "scale(1)" : "scale(0)" }}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          close();
        }
      }}
    >
      <div className="body">{children}</div>
    </div>
  );
};

export default Modal;

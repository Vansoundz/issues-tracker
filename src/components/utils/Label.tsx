import React, { FC } from "react";
import "./utils.css";

interface ILabel {
  totalCount: number;
  nodes: [
    {
      color: string;
      name: string;
    }
  ];
}

const Label: FC<ILabel> = ({ totalCount, nodes }) => {
  let hasLabel = totalCount > 0;
  return (
    <div
      className="label"
      style={{ background: hasLabel ? "#" + nodes[0].color : "" }}
    >
      {hasLabel ? nodes[0].name : ""}
    </div>
  );
};

export default Label;

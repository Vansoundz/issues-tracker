import React from "react";
import { usePreventScroll } from "../../utils/hooks";

const Loading = () => {
  usePreventScroll(true);
  return (
    <div className="loading">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;

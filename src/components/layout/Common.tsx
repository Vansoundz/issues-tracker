import React from "react";
import { useLocation } from "react-router-dom";

const Common = () => {
  const { pathname } = useLocation();
  return <div>{pathname.substr(1)}</div>;
};

export default Common;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { paths } from "../routes/paths";
import { RootState } from "../store";
// import { Link } from "react-router-dom";
// import { paths } from "../routes/paths";
import Loading from "./layout/Loading";

const Index = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const h = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      h.push(paths.issues);
    }
  }, [isLoggedIn, h]);
  return (
    <div className="app">
      {false && <Loading />}
      <button>
        <a href="https://github.com/login/oauth/authorize?client_id=68a8cfcc2cd553f0683f">
          Authorize
        </a>
        {/* Authorize */}
        {/* <Link to={paths.issues}>Authorize</Link> */}
      </button>
    </div>
  );
};

export default Index;

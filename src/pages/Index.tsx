import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { paths } from "../routes/paths";
import { RootState } from "../store";
import { dev } from "../utils";
// import { Link } from "react-router-dom";
// import { paths } from "../routes/paths";
import Loading from "../components/layout/Loading";

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

const Index = () => {
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const h = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      h.push(paths.issues);
    }
  }, [isLoggedIn, h]);

  return (
    <div className="app">
      {loading && <Loading />}
      <div>
        <h4 style={{ fontSize: 26 }}>Welcome to GTrackR</h4>
        <div>
          <img src="/logo512.png" alt="logo" />
        </div>
        <button>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=public_repo%20user&redirect_uri=${
              dev
                ? "http://localhost:3000/auth/callback"
                : "https://gtrackr.netlify.app/auth/callback"
            }`}
          >
            Log in with Github
          </a>
        </button>
      </div>
    </div>
  );
};

export default Index;

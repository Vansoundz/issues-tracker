import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { paths } from "../../routes/paths";
import { RootState } from "../../store";
import Appbar from "./Appbar";
import "./layout.css";
import Loading from "./Loading";

const MainApp: FC = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const h = useHistory();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        h.push(paths.index);
      }
    }
  }, [isLoggedIn, h, loading]);

  const links = [
    { label: "Issues", to: paths.issues },
    { label: "Pull requests", to: paths.pull },
    { label: "Projects", to: paths.projects },
    { label: "Milestones", to: paths.milestones },
  ];

  const { pathname } = useLocation();

  if (loading) return <Loading />;

  return (
    <div className="main-app">
      <div>
        <div className="sidebar">
          <div className="brand">
            <span>
              <img src="/logo512.png" alt="logo" />
            </span>
            <span>GTrack</span>
          </div>
          <ul className="nav">
            {links.map(({ label, to }, i) => {
              return (
                <li
                  key={i}
                  className={`link ${to === pathname ? "active" : ""}`}
                >
                  <span className="box"></span>
                  <Link to={to}>{label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="content">
        <Appbar />
        <div className="content-body">{children}</div>
      </div>
    </div>
  );
};

export default MainApp;

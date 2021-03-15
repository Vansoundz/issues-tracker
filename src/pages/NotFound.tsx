import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { paths } from "../routes/paths";
import { RootState } from "../store";

const NotFound = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div
      style={{
        padding: "2em 16px",
        display: "block",
        margin: "auto",
        maxWidth: "60%",
        textAlign: "center",
      }}
      className="not-found"
    >
      <img
        src="/notfound.jpg"
        style={{
          width: 300,
          height: 300,
          display: "block",
          margin: "auto",
        }}
        alt="not found"
      />
      <div style={{ marginTop: 24 }}>
        <h4>Ooops, page not found</h4>
        <div style={{ marginTop: 24 }}>
          {isLoggedIn ? (
            <Link
              style={{
                maxWidth: 250,
                margin: "auto",
                display: "block",
                padding: 8,
              }}
              to={paths.issues}
            >
              Issues
            </Link>
          ) : (
            <Link
              style={{
                maxWidth: 250,
                margin: "auto",
                display: "block",
                padding: 8,
              }}
              to={paths.index}
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;

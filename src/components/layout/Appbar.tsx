import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Appbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="appbar">
      {user ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>
            <img
              src={user.avatarUrl}
              style={{
                width: 25,
                height: 25,
                borderRadius: "50%",
              }}
              alt="img"
            />
          </span>
          <span style={{ marginLeft: 8 }}>{user.login}</span>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Appbar;

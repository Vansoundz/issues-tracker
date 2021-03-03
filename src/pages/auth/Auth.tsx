import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { dev } from "../../utils";
import Loading from "../../components/layout/Loading";

const SECRET = process.env.REACT_APP_GITHUB_SECRET;
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

const Auth = () => {
  const loc = useLocation();
  const search = loc.search;
  const entries = search.substr(1).split("=");
  const params = { [entries[0]]: entries[1] };
  const { code } = params;

  useEffect(() => {
    if (code) {
      (async () => {
        let body = { client_id: CLIENT_ID, client_secret: SECRET, code };
        let resp = await fetch(
          `https://cors.bridged.cc/https://github.com/login/oauth/access_token`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        let data = await resp.json();
        if (data.access_token) {
          localStorage.setItem("__token", data.access_token);
        }

        window.location.href = dev
          ? "http://localhost:3000"
          : "https://gtrackr.netlify.app/";
      })();
    }
  }, [code]);
  return (
    <div>
      <Loading />
    </div>
  );
};

export default Auth;

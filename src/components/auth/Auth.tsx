// import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SECRET = process.env.REACT_APP_GITHUB_SECRET;
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

// const USER = gql`
//   query {
//     viewer {
//       login
//       avatarUrl
//       email
//       name
//     }
//   }
// `;

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
        // superagent
        //   .post(
        //     "https://cors.bridged.cc/https://github.com/login/oauth/access_token"
        //   )
        //   .send(body)
        //   .set("Accept", "application/json")
        //   .set("Content-Type", "application/json")
        //   .set("Authorizrion", code)
        //   .end(function (err: any, res: any) {
        //     if (err) console.log(`error: ${err}`);
        //     if (res){

        //     }
        //     // Calling the end function will send the request
        //   });
        let data = await resp.json();
        if (data.access_token) {
          localStorage.setItem("__token", data.access_token);
          window.location.href = "http://localhost:3000";
        }
      })();
    }
  }, [code]);
  return <div></div>;
};

export default Auth;

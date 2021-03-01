import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./components/layout/layout.css";
import "./components/utils/utils.css";
import "./components/pages/pages.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { User } from "./models/user.model";
import { TYPES } from "./store/types";
import "react-toastify/dist/ReactToastify.css";

const TOKEN = localStorage.__token;
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// const client = ...

client
  .query({
    query: gql`
      query {
        viewer {
          login
          avatarUrl
          email
          name
          id
        }
      }
    `,
  })
  .then((res) => {
    if (res.data && res.data.viewer) {
      let user: User = {
        avatarUrl: res.data.viewer.avatarUrl,
        email: res.data.viewer.email,
        login: res.data.viewer.login,
        name: res.data.viewer.name,
        id: res.data.viewer.id,
      };
      store.dispatch({ type: TYPES.auth.LOGIN, payload: user });
    }
  })
  .catch(() => store.dispatch({ type: TYPES.auth.STOP }));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

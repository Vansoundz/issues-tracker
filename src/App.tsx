// import React from "react";
import { useSelector } from "react-redux";
import Loading from "./components/layout/Loading";
import Routes from "./routes/Routes";
import { RootState } from "./store";

function App() {
  const { loading } = useSelector((state: RootState) => state.auth);
  return <>{loading ? <Loading /> : <Routes />}</>;
}

export default App;

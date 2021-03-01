// import React from "react";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Loading from "./components/layout/Loading";
import Routes from "./routes/Routes";
import { RootState } from "./store";

function App() {
  const { loading } = useSelector((state: RootState) => state.auth);
  return (
    <>
      {loading ? <Loading /> : <Routes />}
      <ToastContainer
        hideProgressBar={true}
        limit={2}
        position="top-right"
        style={{ color: "white" }}
      />
    </>
  );
}

export default App;

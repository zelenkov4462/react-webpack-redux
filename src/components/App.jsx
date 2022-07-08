import React from "react";
import "./app.less";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/Main";

const App = () => {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        {/*<div className="container">*/}
        <Route path="/" element={<Main />} />
        {/*</div>*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

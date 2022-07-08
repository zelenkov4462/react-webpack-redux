import React from "react";
import "./app.less";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./main/Main";
import Card from "./card/Card";

const App = () => {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        {/*<div className="container">*/}
        <Route path="/" element={<Main />} />
        <Route path="/card" element={<Card />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
        {/*</div>*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

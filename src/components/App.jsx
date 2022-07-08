import React from "react";
import "./app.less";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../reducers/reposReducer";
const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.repos.count);

  const onCountClick = () => {
    dispatch(setCount(5));
  };
  return (
    <div className="app">
      <h1>{count}</h1>
      <button onClick={() => onCountClick()}>Click</button>
      React is working
    </div>
  );
};

export default App;

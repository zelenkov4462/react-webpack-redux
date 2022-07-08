import React from "react";
import { Navigate } from "react-router-dom";

const Error = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => <Navigate to="/" replace={true} />}>
        Go to main page
      </button>
      Error
    </div>
  );
};

export default Error;

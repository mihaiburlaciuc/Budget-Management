import React from "react";

export const MainPage = props => {
  return (
    <div>
      <h1>App Layout</h1>
      <button
        onClick={() => {
            props.history.push("/");
        }}
      >
                  Logout
      </button>
    </div>
  );
};

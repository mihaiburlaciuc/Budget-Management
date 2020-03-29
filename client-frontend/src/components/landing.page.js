import React from "react";

export const LandingPage = props => {
    return (
      <div>
        <h1>Budget Management App</h1>
        <button className="btn btn-primary"
          onClick={() => {
            props.history.push("/main");
          }}
        >
        Login
        </button>
        <p/>
        <button className="btn btn-primary"
          onClick={() => {
            props.history.push("/register");
          }}
        >
        Register
        </button>
      </div>
    );
  };
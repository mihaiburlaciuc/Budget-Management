import React, { Component } from "react";


export default class Register extends Component {
  constructor(props) {
    super(props);
  }

    onDone() {
        console.log("somethings");
    }

    render() {
        return (
            <div>
              <h1>Budget Management App</h1>
              <button className="btn btn-primary"
                onClick={() => {
                  console.log("Done was pressed");
                  this.props.history.push("/");
                }}
              >
              Done
              </button>
          </div>
        );
    }
};
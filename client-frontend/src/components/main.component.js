import React, { Component } from "react";
import axios from 'axios';

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    
    console.log(" props.history.location.state.username" , props.history.location.state.username);  
  }

  render() {
    return (
      <div>
        {/* <h1>Welcome back {this.props.state.username} or {this.props.state.other} </h1> */}
        <button
          onClick={() => {
              this.props.history.push("/");
          }}
        >
                    Logout
        </button>
      </div>
    );
  }
  
};

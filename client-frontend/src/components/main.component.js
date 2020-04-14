import React, { Component } from "react";
import axios from 'axios';

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    
    console.log("props.history.location.state.username" , props.history.location.state.username);  
    console.log("props.history.location.state.token" , props.history.location.state.token);  

    this.state = {
      username: props.history.location.state.username,
      token: props.history.location.state.token,
      balance: 0
    }
  }

  render() {
    return (
      <div>
        
        <h1>Balance: {this.state.balance} </h1>
        <h3>Logged in as {this.state.username} </h3>
        <div>
        
        </div>
        
        <button className="btn btn-primary"
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

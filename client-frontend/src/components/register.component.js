import React, { Component } from "react";
import axios from 'axios';

export default class Register extends Component {
  
  constructor(props) {
    super(props);

    this.serverURL = 'http://localhost:8080/users';
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onDone = this.onDone.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }

    onDone() {
        console.log("username: " + this.state.username);
        console.log("password: " + this.state.password);

        axios.post(this.serverURL + '/register')
        .then(response => {
          console.log(response);
          this.props.history.push("/");
        })
        .catch(err => {
          console.log(err);
          this.props.history.push("/");
        });

        
    }

    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      })
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      })
    }

    render() {
        return (
          <div>
            <h1>Register</h1>
            
            <div className="form-group"> 
              <label>Username: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={ this.state.username }
                  onChange={ this.onChangeUsername }
                  />
            </div>
            <div className="form-group"> 
              <label>password: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={ this.state.password }
                  onChange={ this.onChangePassword }
                  />
            </div>
        
            <button className="btn btn-primary"
              onClick={() => {
                console.log("Done was pressed");
                this.onDone()
                
              }}
            >
            Done
            </button>
          </div>
        );
    }
};
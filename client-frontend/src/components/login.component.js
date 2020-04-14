import React, { Component } from "react";
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.serverURL = 'http://localhost:8080/users/login';
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }

  onLogin() {
    console.log("username: " + this.state.username);
    console.log("password: " + this.state.password);
    console.log("loginReqBAAAA");

    const loginReq = {
      username: this.state.username,
      password: this.state.password
    }; 

    console.log("loginReq " + loginReq.username + " " +loginReq.password);

    axios.post(this.serverURL, loginReq)
        .then(response => {
          console.log("then Respose");
          console.log("Respose", response.data);
          console.log("Respose status", response.status);
          let token = response.data.token;

          this.props.history.push(
            "/main",
            {
              username: this.state.username,
              token: token
            }
          );
        })
        .catch(err => {
          console.log("catch Err");
          console.log(err);
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
            <h1>Budget Management App</h1>
            
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
                this.onLogin()
              }}
            >
            Login
            </button>
            <p/>
            <button className="btn btn-primary"
              onClick={() => {
                this.props.history.push("/register");
              }}
            >
            Register
            </button>
          </div>
      );
  }
    
};
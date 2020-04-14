import React, { Component } from "react";
import axios from 'axios';

export default class Register extends Component {
  
  constructor(props) {
    super(props);

    this.serverURL = 'http://localhost:8080/users/register';
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeBalance = this.onChangeBalance.bind(this);
    this.onDone = this.onDone.bind(this);

    this.state = {
      username: '',
      password: '',
      balance: ''
    }
  }

  onDone() {
    if (this.state.username.length < 3) {
      alert("username must be at least 4 characters long");
      return;
    }

    if (this.state.password.length < 3) {
      alert("password must be at least 4 characters long");
      return;
    }

    if (this.state.balance === '') {
      alert("please insert balance");
      return;
    }

    console.log("username: " + this.state.username);
    console.log("password: " + this.state.password);

    const registerReq = {
      username: this.state.username,
      password: this.state.password,
      balance: this.state.balance
    }; 

    axios.post(this.serverURL, registerReq)
    .then(response => {
      console.log(response);

      if (response.status === 201) {
        console.log("Register succesful")
        this.props.history.push("/");
      }
      
    })
    .catch(err => {
      console.log("Axios error: ", err);
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

  onChangeBalance(e) {
    let number = parseInt(e.target.value) ? parseInt(e.target.value) : ''; 
    
    this.setState({
      balance: number
    });
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
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={ this.state.password }
                onChange={ this.onChangePassword }
                />
          </div>
          <div className="form-group"> 
            <label>Balance: </label>
            <input  type="text"
                required
                className="form-control"
                value={ this.state.balance }
                onChange={ this.onChangeBalance }
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
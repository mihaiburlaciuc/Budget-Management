import React, { Component } from "react";


export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }

    onDone() {
        console.log("username: " + this.state.username);
        console.log("password: " + this.state.password);

        this.props.history.push("/");
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
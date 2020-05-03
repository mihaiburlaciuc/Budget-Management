import React, { Component } from "react";
import axios from 'axios';
import { Form, Row, Col, Button} from 'react-bootstrap';

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

  componentWillMount() {

    let URL3 = 'http://localhost:8080/';
    console.log("Verifying connection to url3: " + URL3);

    axios.get(URL3)
    .then((res) => {
      console.log('Connection verified with response3: ', res);
    })
    .catch(err => {
      console.log("Connection verified with error3", err);
    })
  }

  onLogin() {
    console.log("username: " + this.state.username);
    console.log("password: " + this.state.password);
    
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
      let balance = response.data.balance;

      if (token === undefined) {
        alert("Login failed");
      } else {
        this.props.history.push(
          "/main",
          {
            username: this.state.username,
            token: token,
            balance: balance
          }
        );
      }
      
    })
    .catch(err => {
      alert("Login failed");
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
            <br />
					  <br />
            <h1>Budget Management</h1>
            <br />
					  <br />
            <Form>
            <Form.Label>Username:</Form.Label>
						<Row>
							<Col></Col>
							<Col>
                <Form.Control 
                placeholder="username"
								value={ this.state.username}
								onChange ={ (e) => {this.onChangeUsername(e)} }
								/>
							</Col>
							<Col></Col>
						</Row>
            <br />
						<Form.Label>Password:</Form.Label>
						<Row>
							<Col></Col>
							<Col>
								<Form.Control
								type="password"
								placeholder="password"
								value = { this.state.password }
								onChange ={ e => this.onChangePassword(e) }
								/>
							</Col>
							<Col></Col>
						</Row>
            <br />
            <Row>
							<Col></Col>
							<Col>
								<Button 
									variant="primary"
									block
									onClick={() => {
										this.onLogin()
									}}
								>
									Login
								</Button>
							</Col>
							<Col></Col>
						</Row>
            <br />
					  <br />
						<Row>
							<Col></Col>
							<Col>
								<Button 
									variant="secondary"
									block
									onClick={() => {
                    this.props.history.push("/register");
                  }}
								>
								Register
								</Button>
							</Col>
							<Col></Col>
						</Row>
            </Form>
          </div>
      );
  }
    
};
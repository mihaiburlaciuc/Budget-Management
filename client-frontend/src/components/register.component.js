import React, { Component } from "react";
import axios from 'axios';
import { Form, Row, Col, Button} from 'react-bootstrap';

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
          <h2>Create an account</h2>
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
						<Form.Label>Balance:</Form.Label>
						<Row>
							<Col></Col>
							<Col>
								<Form.Control
								type="number"
								placeholder="initial balance"
								value = { this.state.balance }
								onChange ={ e => this.onChangeBalance(e) }
								/>
							</Col>
							<Col></Col>
						</Row>
          <br/>
          <Row>
							<Col></Col>
							<Col>
								<Button 
									variant="primary"
									block
									onClick={() => {
										this.onDone()
									}}
								>
									Done
								</Button>
							</Col>
							<Col></Col>
						</Row>

          </Form>
        </div>
      );
  }
};
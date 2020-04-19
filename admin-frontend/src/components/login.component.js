import React, { Component } from "react";
import axios from 'axios';
import { InputGroup, Form, Container, Row, Col, Button, Table, Jumbotron } from 'react-bootstrap';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
				password: ''
		}
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		})
	}

	onLogin() {
    console.log("password: " + this.state.password);

    const loginReq = {
      username: "admin",
      password: this.state.password
    }; 

    console.log("loginReq " +loginReq.password);

		let loginURL = 'http://localhost:8080/users/login';
    axios.post(loginURL, loginReq)
		.then(response => {
			console.log("then Respose", response.data);
			let token = response.data.token;

			this.props.history.push(
				"/main",
				{
					token: token
				}
			);
		})
		.catch(err => {
			console.log("catch Err");
			alert("Login failed");
			console.log(err);
		});
  }

	render() {
		return (
				<div>
          <br />
					<br />
					<style>{'body { background-color: white; }'}</style>
					<h1 >Budget Management Admin</h1>
					<br />
					<br />
					<Form>
						<Row>
							<Col></Col>
							<Col>
								<Form.Control 
								value={ "admin" }
								onChange ={ () => {} }
								/>
							</Col>
							<Col></Col>
						</Row>
						<br />
						<Form.Label>Password</Form.Label>
						<Row>
							<Col></Col>
							<Col>
								<Form.Control
								type="password"
								placeholder="Password"
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
						
					</Form>
				</div>
		);
	}
}
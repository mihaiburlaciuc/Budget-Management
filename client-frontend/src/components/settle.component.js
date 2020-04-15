import React, { Component } from "react";
import axios from 'axios';
import { InputGroup, Form, Container, Row, Col, Button, Table } from 'react-bootstrap';

export default class SettleComponent extends Component {
    constructor(props) {
      super(props);

			this.state = {
        username: props.history.location.state.username,
        token: props.history.location.state.token
      }
    }

    render() {
      return (
        <Container>
        	<Form.Group>
						<br />
						<Form.Row>
							<Form.Label column lg={2}>
								<h4>Send to user</h4>
							</Form.Label>
							<Col>
								<Form.Control type="text" placeholder="target username" />
							</Col>
						</Form.Row>
						<br />
						<Form.Row>
							<Form.Label column lg={2}>
								<h4>Amount</h4>
							</Form.Label>
							<Col>
								<Form.Control type="text" placeholder="amount" />
							</Col>
							<Col>
							<InputGroup.Append>
									<InputGroup.Text>LEI</InputGroup.Text>
								</InputGroup.Append>
							</Col>
							
						</Form.Row>
					</Form.Group>

					<Button 
						variant="outline-primary"
						block
						onClick={() => {
								// TODO: axios call to server
								this.props.history.push(
									"/main",
									{
										username: this.state.username,
										token: this.state.token
									}
								);
							}}
						>Send</Button>{' '}
        </Container>
      );
    }
}
import React, { Component } from "react";
import axios from 'axios';
import { InputGroup, Form, Container, Col, Button, Row } from 'react-bootstrap';

export default class SettleComponent extends Component {
    constructor(props) {
      super(props);

			this.state = {
        username: props.history.location.state.username,
        token: props.history.location.state.token,
        isVendorChecked: false,
        isUserCheck: false,
        entityName: '',
        amount: 0
      }
    }

    handleRadioButtonsChange(ev, type) {
      if (type === "User") {
        this.setState({
          isUserCheck: true,
          isVendorChecked: false
        });
      } else {
        this.setState({ 
          isUserCheck: false, 
          isVendorChecked: true
        });
      }
    }

    onChangeEntityName(e) {
      this.setState({
        entityName: e.target.value
      })
    }

    onChangeAmount(e) {
      this.setState({
        amount: e.target.value
      })
    }

    onClickSettle() {
      let serverURL = 'http://localhost:8080/users/addConflict';
      let operation;
      let dstType;

      if (this.state.isVendorChecked) {
        // SETTLING
        operation = 4;
        dstType = 'vendor';
      } else {
        // LENTING
        operation = 1;
        dstType = 'user';
      }

      let addConflictReq = {
        token: this.state.token,
        operation: operation,
        srcEntity: this.state.username,
        dstEntity: this.state.entityName,
        srcOwedAmount: this.state.amount,
        srcType: "user",
        dstType: dstType
      };

      console.log("onClickSettle: addConflictReq" , addConflictReq);

      axios.post(serverURL, addConflictReq)
      .then(response => {
        console.log("addConflict Respose", response.status, response.data);
        
        this.props.history.push(
          "/main",
          {
            username: this.state.username,
            token: this.state.token
          }
        );
      })
      .catch(err => {
        console.log("catch Err");
        console.log(err);
      });
    }

    render() {
      return (
        <Container>
        	<Form.Group>
						<br />
						<Form.Row>
							<Form.Label column lg={2}>
								<h4>Send to:</h4>
							</Form.Label>
							<Col>
                <Form.Control type="text" placeholder="target username/vendor"
                value = { this.state.entityName }
                onChange ={ e => this.onChangeEntityName(e) } />
							</Col>
						</Form.Row>
            <Form.Group as={Row}>
              <Col>
                <Form.Check
                inline
                label="username"
                type="radio"
                checked={ (!this.state.isVendorChecked) }
                onChange={event => this.handleRadioButtonsChange(event, "User")}
                />
              </Col>
              
              <Col>
                <Form.Check 
                inline 
                label=" vendor" 
                type='radio'
                checked={ this.state.isVendorChecked }
                onChange={event => this.handleRadioButtonsChange(event, "Vendor")}
                />  
              </Col> 
            </Form.Group>
            
						<br />
						<Form.Row>
							<Form.Label column lg={2}>
								<h4>Amount</h4>
							</Form.Label>
							<Col>
                <Form.Control 
                  value = { this.state.amount }
                  onChange = { e => this.onChangeAmount(e) }
                  type="number"
                  placeholder="amount" />
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
						onClick={() => this.onClickSettle()}
						>Settle</Button>{' '}
        </Container>
      );
    }
}
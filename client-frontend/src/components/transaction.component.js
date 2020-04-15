import React, { Component } from "react";
import axios from 'axios';
import { InputGroup, Form, Container, Row, Col, Button, Table } from 'react-bootstrap';

export default class TransactionComponent extends Component {
    constructor(props) {
      super(props);
      
      let transact1 = {
        operation: "lent to",
        targetUser: "user1",
        amount: 500
      };
      let transact2 = {
        operation: "borrowed from",
        targetUser: "user12",
        amount: 5002
      };

      let transactions = [transact1, transact2];

      this.state = {
        username: props.history.location.state.username,
        token: props.history.location.state.token,
        targetUsername: '',
        operation: 'Lent money to',
        transactions: transactions
      }
    }

    render() {
      return (
        <div>
          <Container>
            <Form.Group>
              <br />
              <Form.Row>
                <Form.Label column lg={2}>
                  <h4>{this.state.operation}</h4>
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
            <br />
            <Form.Group as={Row}>
              <Col>
              <Form.Check inline label=" lent to " type="radio" id='lent_to_radio_button' />
              </Col>
              
              <Col>
              <Form.Check inline label=" borrowed from " type='radio' id='borrowed_from_radio_button' />  
              </Col>
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
                >Done</Button>{' '}
          </Container>
        </div>
      );
    }
}
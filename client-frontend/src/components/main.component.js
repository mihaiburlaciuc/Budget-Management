import React, { Component } from "react";
import axios from 'axios';
import { InputGroup, FormControl, Container, Row, Col, Button, Table } from 'react-bootstrap';

// https://react-bootstrap.github.io/components/buttons/
export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    
    console.log("props.history.location.state.username" , props.history.location.state.username);  
    console.log("props.history.location.state.token" , props.history.location.state.token);  

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
      balance: 0,
      amountLent: 0,
      amountOwed: 0,
      relativeBalance: 0,
      transactions: transactions
    }
  }

  // table() {
  //   return (
      
  //   );
  // };

  render() {
    return (
        <div>
        <h1>Balance: {this.state.balance} RON </h1>
        <h3>Logged in as {this.state.username} </h3>
        <div>
        <br />

          <Container>
            <Row>
              <Col>
                <h2> Amount lent:<br /> {this.state.amountLent} RON  </h2>
              </Col>
              <Col>
                <h2> Amount owed: <br />{this.state.amountOwed} RON  </h2>
              </Col>
              <Col>
                <h2> Relative balance:<br /> {this.state.relativeBalance} RON  </h2>
              </Col>
            </Row>
          </Container>


          <div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opertation</th>
                  <th>User</th>
                  <th>Amount</th>
                </tr>
              </thead>
              {
              this.state.transactions.map( (tranaction, index,) => (
                  <tr>
                    <td>{index}</td>
                    <td>{tranaction.operation}</td>
                    <td>{tranaction.targetUser}</td>
                    <td>{tranaction.amount}</td>
                  </tr>
                )
              )
              }
            </Table>
          </div>  

          <br />
          <Container>
            <Row>
              <Col>
                <Button 
                variant="outline-primary"
                block
                onClick={() => {
                  this.props.history.push(
                    "/transaction",
                    {
                      username: this.state.username,
                      token: this.state.token
                    }
                  );
                }}
                >New Transaction</Button>{' '}
              </Col>
              <Col>
              <Button
              variant="outline-success"
              block
              onClick={() => {
                this.props.history.push(
                  "/settle",
                  {
                    username: this.state.username,
                    token: this.state.token
                  }
                );
              }}
              >Settle</Button>{' '}
              </Col>
            </Row>
            
          </Container>
        </div>

        <br />

        <Container>
            <Row>
              <Col></Col>
              <Col>
                <Button 
                variant="outline-info"
                onClick={() => {
                  this.props.history.push("/");
                }}
                block >Logout</Button>{' '}
              </Col>
              <Col></Col>
            </Row>
            
          </Container>
      </div>
    );
  }
};

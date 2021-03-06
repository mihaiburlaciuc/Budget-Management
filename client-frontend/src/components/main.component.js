import React, { Component } from "react";
import axios from 'axios';
import { Form, Container, Row, Col, Button, Table } from 'react-bootstrap';

// https://react-bootstrap.github.io/components/buttons/
export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    
    console.log("props.history.location.state.username" , props.history.location.state.username);  
    console.log("props.history.location.state.token" , props.history.location.state.token);  
    console.log("props.history.location.state.balance" , props.history.location.state.balance);  


    this.state = {
      username: props.history.location.state.username,
      token: props.history.location.state.token,
      balance: props.history.location.state.balance,
      amountLent: 0,
      amountOwed: 0,
      relativeBalance: 0,
      transactions: [],
      balanceModifier: 0
    }
  }

  componentWillMount() {
    console.log("componentWillMount => getEntityTransaction");
    let serverURL = 'http://localhost:8080/users/getEntityTransaction';

    let getEntityTransactionReq = {
      token: this.state.token,
      srcEntity: this.state.username
    }

    axios.post(serverURL, getEntityTransactionReq)
    .then(response => {
      console.log("getEntityTransaction Respose", response.status, response.data);
      let transactions = response.data.transactions;

      var amountLent = 0;
      var amountOwed = 0;
      // Calculate relative
      transactions.forEach(t => {
        if (t.operationType === 1) {
          amountLent += t.amount;
        } else {
          amountOwed += t.amount;
        }
      });

      let relativeBalance = this.state.balance + amountLent - amountOwed;

      this.setState({
        transactions: transactions,
        amountLent: amountLent,
        amountOwed: amountOwed,
        relativeBalance: relativeBalance,
      });
    })
    .catch(err => {
      console.log("catch Err");
      console.log(err);
    });

    // get balance req
    let getBalanceURL = 'http://localhost:8080/users/getBalance';
    let getBalanceReq = {
      token: this.state.token
    }

    axios.post(getBalanceURL, getBalanceReq)
    .then(response => {
      console.log("getBalanceReq Respose", response.status, response.data);
      let balance = response.data.balance

      let relativeBalance = balance + this.state.amountLent - this.state.amountOwed;

      this.setState({
        balance: balance,
        relativeBalance: relativeBalance,
      });
    })
    .catch(err => {
      console.log("catch Err");
      console.log(err);
    });
  }

  onModifyBalance(sign) {
    this.serverURL = 'http://localhost:8080/users/modifyBalance';

    // casting to int
    var balanceModifier = this.state.balanceModifier * 1;
    if (sign === "Minus") {
      balanceModifier *= (-1);
    }

    let modifyBalanceReq = {
      token: this.state.token,
      balanceModifier: balanceModifier
    };

    console.log("onModifyBalance: modifyBalanceReq" , modifyBalanceReq);

    axios.post(this.serverURL, modifyBalanceReq)
    .then(response => {
      console.log("then Respose");
      console.log("Respose", response.data);
      console.log("Respose status", response.status);
      let newBalance = response.data.newBalance;

      let relativeBalance = newBalance + this.state.amountLent - this.state.amountOwed;
      this.setState({
        balance: newBalance,
        relativeBalance: relativeBalance
      });
    })
    .catch(err => {
      console.log("catch Err");
      console.log(err);
    });
  }

  onChangeBalanceModifier(e) {
    this.setState({
      balanceModifier: e.target.value
    })
  }

  render() {
    return (
        <div>
        <br />
        <br />
        <h1>Balance: {this.state.balance} RON </h1>
        <h5 style={{ color: 'gray' }}>Logged in as {this.state.username} </h5>
        <div>
        <br />
        <br />
          <Container>
            <Row>
              <Col lg={3}>
                <h4 >Modify balance: </h4>
              </Col>
              <Col>
                <Form.Control 
                value = { this.state.balanceModifier }
                onChange ={ e => this.onChangeBalanceModifier(e) }
                type="number"
                placeholder="amount"
                />
              </Col>
              <Col lg={1}>
                <Button 
                  variant="outline-primary"
                  block
                  onClick={() => {
                    this.onModifyBalance("Plus");
                  }}
                >+</Button>{' '}
              </Col>
              <Col lg={1}>
                <Button 
                  variant="outline-primary"
                  block
                  onClick={() => {
                    this.onModifyBalance("Minus");
                  }}
                >-</Button>{' '}
              </Col>
            </Row>
            <br />
            <br />
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
                  <th>Operation</th>
                  <th>User</th>
                  <th>Amount</th>
                </tr>
              </thead>
              {
              this.state.transactions.filter(t => t.amount != 0)
              .map( (tranaction, index,) => (
                  <tr>
                    <td>{index}</td>
                    <td>{tranaction.operation}</td>
                    <td>{tranaction.dstEntity}</td>
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
              variant="outline-primary"
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

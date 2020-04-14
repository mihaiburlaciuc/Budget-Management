import React, { Component } from "react";
import axios from 'axios';
import { InputGroup, FormControl, Container, Row, Col, Button, Table } from 'react-bootstrap';

// https://react-bootstrap.github.io/components/buttons/
export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    
    console.log("props.history.location.state.username" , props.history.location.state.username);  
    console.log("props.history.location.state.token" , props.history.location.state.token);  

    this.state = {
      username: props.history.location.state.username,
      token: props.history.location.state.token,
      balance: 0,
      amountLent: 0,
      amountOwed: 0,
      relativeBalance: 0
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </div>  

          <br />
          <Container>
            <Row>
              <Col>
              <Button variant="outline-primary" block>New Transaction</Button>{' '}
              </Col>
              <Col>
              <Button variant="outline-success" block>Settle</Button>{' '}
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

import React, { Component } from "react";
import axios from 'axios';
import { InputGroup, Form, Container, Row, Col, Button} from 'react-bootstrap';

export default class TransactionComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        username: props.history.location.state.username,
        token: props.history.location.state.token,
        targetUsername: '',
        operation: 'Lent money to',
        amount: 0,
        lentToChecked: true,
        borrowFromChecked: false
      }
    }

    onChangeTargetUsername(e) {
      this.setState({
        targetUsername: e.target.value
      })
    }

    onChangeAmount(e) {
      this.setState({
        amount: e.target.value
      })
    }

    handleRadioButtonsChange(ev, type) {
      if (type === "Lent") {
        this.setState({
          lentToChecked: true,
          borrowFromChecked: false, 
          operation: "Lent to"
        });
      } else {
        this.setState({ 
          lentToChecked: false, 
          borrowFromChecked: true, 
          operation: "Borrow from"
        });
      }
    }

    onClickDone() {
      let serverURL = 'http://localhost:8080/users/addConflict';
      let operation;

      if (this.state.username.length < 4) {
        alert("username is not valid");
      }

      if (this.state.lentToChecked) {
        // LENT
        operation = 1;
      } else {
        // BORROWED
        operation = 2;
      }

      let addConflictReq = {
        token: this.state.token,
        operation: operation,
        srcEntity: this.state.username,
        dstEntity: this.state.targetUsername,
        srcOwedAmount: this.state.amount,
        srcType: "user",
        dstType: "user"
      };

      console.log("onClickDone: addConflictReq" , addConflictReq);

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
        <div>
          <Container>
            <Form.Group>
              <br />
              <Form.Row>
                <Form.Label column lg={2}>
                  <h4>{this.state.operation}</h4>
                </Form.Label>
                <Col>
                  <Form.Control
                  type="text"
                  placeholder="target username"
                  value = { this.state.targetUsername }
                  onChange ={ e => this.onChangeTargetUsername(e) } />
                </Col>
              </Form.Row>
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
            <Form.Group as={Row}>
              <Col>
                <Form.Check
                inline
                label=" lent to "
                type="radio"
                checked={this.state.lentToChecked}
                onChange={event => this.handleRadioButtonsChange(event, "Lent")}
                />
              </Col>
              
              <Col>
                <Form.Check 
                inline 
                label=" borrowed from " 
                type='radio'
                checked={this.state.borrowFromChecked}
                onChange={event => this.handleRadioButtonsChange(event, "Borrow")}
                />  
              </Col> 
            </Form.Group>
            <br />
            <Button 
                variant="outline-primary"
                block
                onClick={() => this.onClickDone()}
                >Done</Button>{' '}
          </Container>
        </div>
      );
    }
}
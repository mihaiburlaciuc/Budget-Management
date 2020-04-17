import React, { Component } from "react";
import axios from 'axios';
import { InputGroup, Form, Container, Row, Col, Button, Table, Jumbotron } from 'react-bootstrap';

// https://react-bootstrap.github.io/components/buttons/
export default class MainComponent extends Component {
	constructor(props) {
		super(props);
		
		console.log("props.history.location.state.token" , props.history.location.state.token);
		let vendors = [];

		this.state = {
				token: props.history.location.state.token,
				addVendorName: '',
				vendors:vendors,
				transactionUsername: '',
				transactionVendor: '',
				transactionAmount: 0				
		}
	}

	componentWillMount() {
		this.getVendors();
	}

	getVendors() {
	console.log("componentWillMount => getVendors");
	let serverURL = 'http://localhost:8080/vendors/getVendors';

    let getVendorsReq = {
      token: this.state.token
		}
		
		axios.post(serverURL, getVendorsReq)
    .then(response => {
      console.log("getVendors Respose", response.status, response.data);
      let vendors = response.data.vendors;

      this.setState({
				vendors: vendors
      });
    })
    .catch(err => {
      console.log("catch Err");
      console.log(err);
    });
	}

	onChangeAddVendorName(e) {
		this.setState({
			addVendorName: e.target.value
		})
	}

	onAddVendor() {
		let serverURL = 'http://localhost:8080/vendors/addVendor';

    const addVendorReq = {
			token: this.state.token,
			vendorName: this.state.addVendorName
    }; 

    console.log("addVendorReq ", addVendorReq);

    axios.post(serverURL, addVendorReq)
		.then(response => {
			console.log("then Respose", response.data);
			
			// if (response.data !== null) {
			// 	alert(response.data.message);
			// }

			this.getVendors();
		})
		.catch(err => {
			alert("Error" + err);
			console.log(err);
		});
	}

	onChangeTransactionUserame(e) {
		this.setState({
			transactionUsername: e.target.value
		})
	}

	onChangeTransactionVendor(e) {
		this.setState({
			transactionVendor: e.target.value
		})
	}

	onChangeTransactionAmount(e) {
		this.setState({
			transactionAmount: e.target.value
		})
	}

	onAddTransaction() {
		// Verify data correctness
		var vendorExists = false;
		this.state.vendors.forEach(vendor => {
			if (vendor.name === this.state.transactionVendor) {
				vendorExists = true;
			}
		})

		if (!vendorExists) {
			alert("Invalid vendor");
			return;
		}

    let serverURL = 'http://localhost:8080/users/addConflict';

		// OWEING
		let operation = 3;

    const addConflictReq = {
      token: this.state.token,
			operation: operation,
			srcEntity: this.state.transactionUsername,
			dstEntity: this.state.transactionVendor,
			srcOwedAmount: this.state.transactionAmount,
			srcType: "user",
			dstType: "vendor"
    }; 

    console.log("onAddTransaction: addConflictReq" , addConflictReq);
    axios.post(serverURL, addConflictReq)
		.then(response => {
			console.log("addConflict Respose", response.status, response.data);
			
			if (response.data !== null) {
				alert("Transaction added");
			}

			this.getVendors();
		})
		.catch(err => {
			console.log("catch Err");
			console.log(err);
		});
	}

	render() {
			return (
				<div>
					<h1>Budget Management Admin console</h1>
					<Row>
						<Col>
							<h4>Add vendor</h4>
						</Col>
						<Col>
								<Form.Control 
								type="text"
								placeholder="Vendor name"
								value = { this.state.addVendorName }
								onChange ={ e => this.onChangeAddVendorName(e) }
								/>
						</Col>
						<Col>
							<Button 
								variant="primary"
								block
								onClick={() => {
									this.onAddVendor()
								}}
							>
							Add
							</Button>
						</Col>
					</Row>
					
					<br />
					<div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Vendor</th>
                  <th>Amount to receive</th>
                </tr>
              </thead>
              {
								this.state.vendors.map( (vendor, index,) => (
										<tr>
											<td>{index}</td>
											<td>{vendor.name}</td>
											<td>{vendor.amountToReceive}</td>
										</tr>
									)
								)
              }
            </Table>
          </div>  
					<br />
					
					<Jumbotron>
						<Row>
							<Col>
							<h2>New transaction</h2>
							</Col>
							<Col lg={10}></Col>
						</Row>
						<Form.Group>
							<Form.Control 
									type="text"
									placeholder="Username"
									value = { this.state.transactionUsername }
									onChange ={ e => this.onChangeTransactionUserame(e) }
								/>
							<br />
							<Form.Control 
									type="text"
									placeholder="Vendor"
									value = { this.state.transactionVendor }
									onChange ={ e => this.onChangeTransactionVendor(e) }
								/>
							<br />
							<Form.Control 
										value = { this.state.transactionAmount }
										onChange = { e => this.onChangeTransactionAmount(e) }
										type="number"
										placeholder="Amount" />
						</Form.Group>

						<Button 
                variant="outline-primary"
                block
                onClick={() => this.onAddTransaction()}
                >Add transaction</Button>{' '}
					</Jumbotron>
					
				</div>
			);
	}
}
import React, { Component} from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './user.scss';
const ETHQ_ENDPOINT = process.env.REACT_APP_ETHQ_ENDPOINT;

export default class CreateInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {items: [], sender: '', receiver: ''};
      }
      payInvoice(transaction) {
        transaction.sender_address = this.state.sender;
        transaction.recipient_address = this.state.receiver;
        this.props.payInvoice(transaction, transaction.amount);
      }
      componentWillReceiveProps(nextProps) {
        this.setState({sender: nextProps.data.recipient_address, receiver: nextProps.data.sender_address})
      }

  render() {
    const { dialogVisible, handleCloseDialog, data, dataItem, toggle} = this.props;
    let actionButtonReceived, actionButtonPayed;
    if(toggle=='paid'){
      if(data.status2=='paid'){
        actionButtonPayed = 
          <a href={`${ETHQ_ENDPOINT}/tx/${data.transaction_hash2}`} target="_blank">
          <Button className="btn btn-secondary">Reciept of Paid Money</Button>
          </a>
      }
      else{
        actionButtonPayed = <Button className="btn btn-secondary" onClick={() => this.payInvoice(data)}>Pay</Button>
      }
    }
    if(data.status=='paid'){
      actionButtonReceived = 
      <a href={`${ETHQ_ENDPOINT}/tx/${data.transaction_hash}`} target="_blank">
          <Button className="btn btn-secondary">Reciept of Received money</Button>
      </a>
    }
    return (
      <div>
      <Modal show={dialogVisible} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
<Form>
{/* <div class="alert alert-danger" role="alert">
  Alert! You have already submitted an invoice discounting request with the same invoice number!
</div> */}
<Form.Group controlId="description">
   <Form.Label>Invoice Number</Form.Label>
    <Form.Control type="text" placeholder="Enter the unique invoice number" value={data.invoiceNumber} onChange={this.invoiceNumberChanged} disabled/>

  </Form.Group> 

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Account number of the Invoice Financing Company</Form.Label>
    <Form.Control type="text" placeholder="Enter wallet address" value={data.recipient_address} disabled/>
  </Form.Group>

  <Form.Group controlId="description">
   <Form.Label>Discount provided by the company</Form.Label>
    <Form.Control type="text" placeholder="0" value={data.discount} disabled/>
  </Form.Group> 


  <Form.Group controlId="description">
   <Form.Label>Customer's Name</Form.Label>
    <Form.Control type="text" placeholder="Who is the customer of the Goods/Services?" value={data.customerName} disabled/>

    <Form.Group controlId="description">
   <Form.Label>Date as per invoice</Form.Label>
      <Form.Control type="text" value={new Date(data.selectedInvoiceDate).toDateString()} disabled/>
  </Form.Group>  

  </Form.Group> 
    
  <Form.Group controlId="description">
        <Form.Label>Items Listed in the invoice</Form.Label>
        <div class="input-group mb-3">
          <Form.Control type="text" placeholder="Item Name" disabled/>
          <Form.Control type="text" placeholder="Quantity" disabled/>
          <Form.Control type="text" placeholder="Price per item" disabled/>
          <div class="input-group-append">
          </div>
        </div>
        <ul class="list-group">
        {dataItem.map(x => (
        <div class="container ">
        <div class="row">
          <div className="col-sm list-group-item">
            {x.itemName}
          </div>
          <div className="col-sm list-group-item">
            {x.itemQuantity}
          </div>
          <div className="col-sm list-group-item">
            {x.itemPrice}
          </div>
        </div>
      </div>
))}
          {/* <li class="list-group-item">Jello</li> */}
        </ul>
  </Form.Group>  

  <Form.Group controlId="description">
   <Form.Label>Total Amount</Form.Label>
    <Form.Control type="text" placeholder="What is the total amount of Invoice" value={data.amount} disabled/>
  </Form.Group> 


  <Form.Group controlId="description">
   <Form.Label>Date within which funds are needed</Form.Label>
      <Form.Control type="text" value={new Date(data.selectedFinanceDate).toDateString()} disabled/>
  </Form.Group>  

  <Form.Group controlId="description">
  <Form.Label>Label</Form.Label>
  <Form.Control type="text" placeholder="Discription" value={data.label} disabled/>
  </Form.Group>
  
     {/* <Form.Group controlId="formBasicEmail">   
      <Form.Check  inline
        type={"radio"}
        id={`default-`}
        label={`Per Hour`}
        name="projectType"
        checked={perHour}
        onChange={this.perHourToggle}
      />
        <Form.Check  inline
        type={"radio"}
        id={`default-`}
        label={`Per Project`}
        checked={perProject}
        onChange={this.perProjectToggle}
      />
      </Form.Group> */}
      {/* {currentPayForm} */}
  {/* <Form.Group controlId="description">
    <Form.Label>Description/Comments</Form.Label>
    <Form.Control as="textarea" rows="3" value={description} onChange={this.descriptionChanged}/>
  </Form.Group>    */}
  </Form>
        
        </Modal.Body>
        <Modal.Footer>
          {actionButtonPayed}
          {actionButtonReceived}
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>      
      </div>
    )
  }
}

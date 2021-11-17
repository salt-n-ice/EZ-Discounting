import React, { Component} from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './user.scss';
import InvoiceContract from './Invoices.json'
const Web3 = require('web3');
var util = require('web3-utils');
// const [selectedInvoiceDate, setselectedInvoiceDate] = useState(null);
export default class CreateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '', pay: 0, type: '', hours: 0, perHour: true, perProject: false, label: '', description: '', selectedInvoiceDate: '', selectedFinanceDate: '', invoiceNumber: '', customerName: '', amount: 0, items: [], storeItem: '', success: 'init', discount: 15};
  }
  submitInvoice = async () => {
    const { address, pay, type, hours, label, description, perHour,selectedInvoiceDate, selectedFinanceDate, invoiceNumber, customerName, amount, items, storeItem, discount} = this.state;
    let ok = await this.checkInvoice();
    console.log(ok);
    if(ok){
    await this.addInvoice();
    }
    const sender_address = window.ethereum.selectedAddress;
    console.log("Sender address is : " + sender_address);

    const payload = {
      sender_address: sender_address.toLowerCase(),
      recipient_address: address.toLowerCase(),
      amount: amount,
      description,
      label,
      selectedInvoiceDate,
      selectedFinanceDate,
      invoiceNumber,
      customerName,
      amount,
      storeItem,
      discount
    }
    this.props.submitInvoice(payload);
    // this.props.handleCloseDialog();
  }

  checkInvoice = async () => {
    const {invoiceNumber}  = this.state;
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    const currAddress = window.ethereum.selectedAddress;
    let abi = InvoiceContract.abi;
    let contractAddress = InvoiceContract.networks[5777].address;
    var myContract = new web3.eth.Contract(abi, contractAddress);
    let ok = await myContract.methods.checkInvoice(currAddress, invoiceNumber).call();
    return ok;
  }

  addInvoice = async () => {
    const {address, invoiceNumber} = this.state;
    const currAddress = window.ethereum.selectedAddress;
    let abi = InvoiceContract.abi;
    let contractAddress = InvoiceContract.networks[5777].address;
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    var myContract = new web3.eth.Contract(abi, contractAddress);
    await myContract.methods.addInvoice(currAddress, address,  invoiceNumber).send({from: currAddress , gas:3000000});
  }




  addItem = () => {
    const {items, itemName, itemQuantity, itemPrice, amount} = this.state;
    items.push({itemName: itemName, itemQuantity: itemQuantity, itemPrice: itemPrice});
    this.setState({storeItem: JSON.stringify(items)});
    this.setState({items: items});
    this.setState({itemName: '', itemQuantity: '', itemPrice: ''});
    this.setState({amount: amount+parseFloat(itemQuantity)*parseFloat(itemPrice)})
    // var li = document.createElement("li");
    // li.className = 'list-group-item';
    // li.textContent =itemName;
    // ul.appendChild(li);
  }

  perHourToggle = (evt) => {
    this.setState({ perHour: evt.target.checked, perProject: !evt.target.checked })
  }

  perProjectToggle = (evt) => {
    this.setState({ perProject: evt.target.checked, perHour: !evt.target.checked });
  }

  hoursChanged = (evt) => {
    this.setState({ hours: evt.target.value });
  }

  payChanged = (evt) => {
    this.setState({ pay: evt.target.value });
  }

  managerAddressChanged = (evt) => {
    this.setState({ address: evt.target.value });
  }

  labelChanged = (evt) => {
    this.setState({ label: evt.target.value });
  }

  descriptionChanged = (evt) => {
    this.setState({ description: evt.target.value });
  }
  InvoiceDateChanged = (date) => {
    this.setState({selectedInvoiceDate : date});
  }
  FinanceDateChanged = (date) => {
    this.setState({selectedFinanceDate : date});
  }
  invoiceNumberChanged = (evt) => {
    this.setState({invoiceNumber : evt.target.value});
  }
  CustomerNameChanged = (evt) => {
    this.setState({customerName: evt.target.value});
  }
  amountChanged = (evt) => {
    this.setState({amount: evt.target.value});
  }
  itemNameChanged = (evt) => {
    this.setState({itemName: evt.target.value});
  }
  itemQuantityChanged = (evt) => {
    this.setState({itemQuantity: evt.target.value});
  }
  itemPriceChanged = (evt) => {
    this.setState({itemPrice: evt.target.value});
  }

  componentWillReceiveProps(nextProps) {
    const { success, dialogVisible } = nextProps;
    this.setState({success: success});
    if(success=='init'){
    }
    else if(success=='success'){
      if(dialogVisible){
        this.props.handleCloseDialog();
      }
      else{
        //change success to 'init'
        this.props.initializeSuccess();
      }
    }
    else if(success=='failure'){

    }
  }

  render() {
    const { success } = this.props;
    // console.log(success);
    const { dialogVisible, handleCloseDialog, } = this.props;
    const { pay, description, perHour, perProject, hours, address, label, selectedInvoiceDate, selectedFinanceDate, invoiceNumber, customerName, amount, itemName, itemQuantity, itemPrice, discount} = this.state;

    let alertMessage = <span/>;
    if(this.state.success=='failure'){
      alertMessage = 
      <div class="alert alert-danger" role="alert">
      Alert! You have already submitted an invoice discounting request with the same invoice number!
    </div>
    }
    let currentPayForm = <span/>;
    if (perHour) {
      currentPayForm =
        <div>
        <Form.Row>
          <Col>
                <Form.Control type="text" placeholder="Enter amount" value={pay} onChange={this.payChanged}/>
                <Form.Text className="text-muted">
                    Enter the amount (Ether)
                </Form.Text>
           </Col> 
         <Col>
                <Form.Control type="text" placeholder="Enter hours" value={hours} onChange={this.hoursChanged}/>
                <Form.Text className="text-muted">
                    Enter the hours
                </Form.Text>
          </Col>     
        </Form.Row>
    </div>
    }
    else {
      currentPayForm = <Form.Group>
          <Form.Control type="text" placeholder="Enter amount" value={pay} onChange={this.payChanged}/>
          <Form.Text className="text-muted">
              Enter the amount (Ether)
          </Form.Text>
      </Form.Group>
    }
    return (
      <div>
      <Modal show={dialogVisible} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a new invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
<Form>
{alertMessage}
<Form.Group controlId="description">
   <Form.Label>Invoice Number</Form.Label>
    <Form.Control type="text" placeholder="Enter the unique invoice number" value={invoiceNumber} onChange={this.invoiceNumberChanged} autocomplete="off"/>

  </Form.Group> 

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Enter the Account number of the Invoice Financing Company</Form.Label>
    <Form.Control type="text" placeholder="Enter wallet address" value={address} onChange={this.managerAddressChanged} autocomplete="off"/>
    <Form.Text className="text-muted" >
      Enter the public key of your manager's wallet
    </Form.Text>
  </Form.Group>


  <Form.Group controlId="description">
   <Form.Label>Discount provided by the company</Form.Label>
    <Form.Control type="text" placeholder="0" value={discount} onChange={this.amountChanged} autocomplete="off" disabled/>
  </Form.Group> 

  <Form.Group controlId="description">
   <Form.Label>Customer's Name</Form.Label>
    <Form.Control type="text" placeholder="Who is the customer of the Goods/Services?" value={customerName} onChange={this.CustomerNameChanged} autocomplete="off"/>

    <Form.Group controlId="description">
   <Form.Label>Date as per invoice</Form.Label>
      <DatePicker selected={selectedInvoiceDate} onChange={this.InvoiceDateChanged} autocomplete="off"/>
  </Form.Group>  

  </Form.Group> 
    
  <Form.Group controlId="description">
        <Form.Label>Items Listed in the invoice</Form.Label>
        <div class="input-group mb-3">
          <Form.Control type="text" placeholder="Item Name" value={itemName} onChange={this.itemNameChanged} autocomplete="off"/>
          <Form.Control type="text" placeholder="Quantity" value={itemQuantity} onChange={this.itemQuantityChanged} autocomplete="off"/>
          <Form.Control type="text" placeholder="Price per item" value={itemPrice} onChange={this.itemPriceChanged} autocomplete="off"/>
          <div class="input-group-append">
          <Button variant="primary" onClick={this.addItem}>
            Add
          </Button>
          </div>
        </div>
        <ul class="list-group">
        {this.state.items.map(x => (
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
    <Form.Control type="text" placeholder="What is the total amount of Invoice" value={amount} onChange={this.amountChanged} autocomplete="off" disabled/>
  </Form.Group> 


  <Form.Group controlId="description">
   <Form.Label>Date within which funds are needed</Form.Label>
      <DatePicker selected={selectedFinanceDate} onChange={this.FinanceDateChanged} autocomplete="off"/>
  </Form.Group>  

  <Form.Group controlId="description">
  <Form.Label>Label</Form.Label>
  <Form.Control type="text" placeholder="Discription" value={label} onChange={this.labelChanged} autocomplete="off"/>
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
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.submitInvoice}>
            Submit Invoice
          </Button>
        </Modal.Footer>
      </Modal>      
      </div>
    )
  }
}

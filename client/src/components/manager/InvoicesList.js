import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import PayInvoice from './PayInvoice';
import * as moment from 'moment';
const ETHQ_ENDPOINT = process.env.REACT_APP_ETHQ_ENDPOINT;

export default class InvoicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {dialogVisible: false, data: [], dataItem: []};
  }
  payInvoice(transaction) {
    this.props.payInvoice(transaction);
  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  handleCloseDialog = () => {
    this.setState({ dialogVisible: false });
  }
  showInvoice = (idx) =>{
    console.log(idx);
    this.setState({data: this.props.invoices[idx]});
    this.setState({dataItem: JSON.parse(this.props.invoices[idx].storeItem)});
    // console.log(this.props.invoices[idx].selectedInvoiceDate);
    this.setState({dialogVisible: true});
  }
  render() {
    const { dialogVisible, data, dataItem} = this.state;
    const { invoices } = this.props;
    const self = this;

    return (
      <div>
        <PayInvoice dialogVisible={dialogVisible} handleCloseDialog={this.handleCloseDialog} data={data} dataItem={dataItem} payInvoice={this.props.payInvoice} toggle={this.props.toggle}/>
       <ListGroup className="manager-invoice-list">
        <ListGroupItem className="list-table-header">
          <Row>
            <Col lg={1}>
              From
            </Col>
            <Col lg={3}>
              Invoice No.
            </Col>
            <Col lg={1}>
              Amount
            </Col>
            <Col lg={2}>
              Due Date
            </Col>
            <Col lg={2} className="transaction-detail-header">
              Details
            </Col>
            <Col lg={1}>
              Status
            </Col>
            <Col lg={1}>
              Action
            </Col>
          </Row>
        </ListGroupItem>
              <div>
          {
          invoices.map((transaction, index) => {
            if(this.props.toggle=='paid'){
              if(transaction.status=='unpaid') return;
            }
            else{
              if(transaction.status=='paid') return;
            }
            let dueDate;
            if(this.props.toggle=='paid') dueDate = moment(transaction.selectedInvoiceDate).format("YY-MM-DD HH:mm");
            else dueDate = dueDate = moment(transaction.selectedFinanceDate).format("YY-MM-DD HH:mm");
          let actionButton = <span/>;
          // if (transaction.status === 'paid') {
          //   actionButton = 
          //   <a href={`${ETHQ_ENDPOINT}/tx/${transaction.transaction_hash}`} target="_blank">
          //   <Button className="manager-invoice-btn secondary-btn">Reciept</Button>
          //   </a>
          // } else {
          //    actionButton = <Button className="manager-invoice-btn" onClick={self.payInvoice.bind(self, transaction)}>Pay</Button>
          // }
          actionButton = <Button className="manager-invoice-btn">View</Button>;
         return <ListGroupItem className='transaction' key={`txn-${index}`} onClick={()=>this.showInvoice(index)}>    
              <Row>

                <Col lg={1}>
                <TransactioniIdentifier transaction={transaction}/>
                </Col>
                <Col lg={3}>
                {transaction.invoiceNumber}
                </Col>
                <Col lg={1}>
                {((transaction.amount*(100-transaction.discount))/100)}
                </Col>
                <Col lg={2}>
                {dueDate}
                </Col>
                <Col lg={2} className="transaction-detail-cell">
                  <TransactionDetails transaction={transaction} key={`description-key-${index}`}/>
                </Col>
                <Col lg={1}>
                {transaction.status}
                </Col>
                <Col lg={1}>
                  {actionButton}
                </Col>
              </Row>
          </ListGroupItem>    
              })}
      
      </div>
      </ListGroup>     
      </div>
    )
  }
}

class TransactionDetails extends Component {
  render() {
    
    const { transaction } = this.props;
    return (
      
      <div>
        
        <div className="cell-data">
          {transaction.label}
        </div>
        <div className="cell-label">
          Label
        </div>
        <div className="cell-data">
          {transaction.description}
        </div>
        <div className="cell-label">
          Description
        </div>
      </div>
    )
  }
}

class TransactioniIdentifier extends Component {
  render() {
    const { transaction } = this.props;
    let senderAddress = transaction.sender_address ?
      transaction.sender_address.substr(0, 5) + "...." + transaction.sender_address.substr(transaction.sender_address.length - 6, transaction.sender_address.length - 1) :
      "";
    let senderAddressLink = "";
    if (senderAddress) {
      senderAddressLink = <a href={`${ETHQ_ENDPOINT}/search?q=(from:${transaction.sender_address}%20OR%20to:${transaction.sender_address})`} target="_blank">{senderAddress}</a>;
    }

    return (
      <div>
        <div>
          {senderAddressLink}
        </div>
      </div>
    )
  }
}

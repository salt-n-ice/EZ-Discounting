import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Container, Tabs, Tab, Button } from 'react-bootstrap';
import CreateInvoice from './CreateInvoice';
import { isNonEmptyArray } from '../../utils/ObjectUtils';
import { checkIfPaymentStatusUpdate } from '../../utils/ObjectUtils';
import UserInvoiceList from './UserInvoiceList';
import TransactionStatus from '../transaction/TransactionStatus';
import './user.scss';

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: 'unpaid', dialogVisible: false, pendingTransactions: [] };
  }
  componentWillMount() {
    this.props.getPreviousInvoices();

    this.listenForInvoicePayments();
  }



  listenForInvoicePayments = () => {
    const self = this;
    this.timer = setInterval(function() {
      self.props.getPreviousInvoices();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  componentWillReceiveProps(nextProps) {
    const { user: { previousInvoices , success} } = nextProps;
    // console.log(success);
    if (previousInvoices && this.props.user.previousInvoices.length > 0) {
      let invoiceDiff = checkIfPaymentStatusUpdate(previousInvoices, this.props.user.previousInvoices);
      if (isNonEmptyArray(invoiceDiff)) {
        let currentPendingTransactions = this.state.pendingTransactions;
        currentPendingTransactions.push(invoiceDiff);
        this.setState({ pendingTransactions: currentPendingTransactions })
      }
    }
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  handleCloseDialog = () => {
    this.setState({ dialogVisible: false });
  }

  homeTabToggle = (toggle) => {
    
    this.setState({ toggle: toggle });
  }

  render() {
    const { dialogVisible, pendingTransactions} = this.state;
    const { user } = this.props;
    let pendingTransactionList = <span/>;
    if (isNonEmptyArray(pendingTransactions)) {
      pendingTransactionList =
        pendingTransactions.map(function(item, idx) {
          return <TransactionStatus key={`${item}+${idx}`} transaction_hash={item}/>;
        });
    }

    let invoiceList = <span/>;
    if (user.previousInvoices.length > 0) {
      invoiceList = <UserInvoiceList previousInvoices={user.previousInvoices} toggle={this.state.toggle} payInvoice={this.props.payInvoice}/>;
    }
    else {
      invoiceList = <div className="empty-list-container empty-user-list">No invoices to show here.</div>
    }
    return (
      <Container>
      
      {pendingTransactionList}
      <CreateInvoice dialogVisible={dialogVisible} handleCloseDialog={this.handleCloseDialog} submitInvoice={this.props.submitInvoice} success={user.success} initializeSuccess={this.props.initializeSuccess}/>
      <Row className="add-invoice-btn-row">
        <Col lg={3}>
        <Button onClick={this.showDialog} className="add-invoice-btn">Submit New Invoice</Button>
        </Col>
        <Col lg={9}>
        
        </Col>
      </Row>
      
      <Tabs defaultActiveKey="unpaid" id="home-view-tab" onSelect={this.homeTabToggle}>
            <Tab eventKey="unpaid" title="Payment Pending">
              <ListGroup>
                <ListGroupItem className="list-table-header"> 
                  <Row> 
                    <Col lg={12}>
                      {invoiceList}
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Tab>
            <Tab eventKey="paid" title="Payment Received">
              <ListGroup>
                <ListGroupItem className="list-table-header"> 
                <Row> 
                    <Col lg={12}>
                      {invoiceList}
                    </Col>
                  </Row>
                </ListGroupItem>
                
                {/* {transactionList} */}
              </ListGroup>
            </Tab>
        </Tabs>  
      </Container>
    )
  }
}

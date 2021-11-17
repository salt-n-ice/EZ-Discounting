import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Container, Tabs, Tab, Button } from 'react-bootstrap';
import InvoicesList from './InvoicesList';
import { getTransactionStatus } from '../../utils/DfuseUtils';
import './manager.scss';

export default class ManagerView extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: 'unpaid' };
  }
  componentWillMount() {
    this.props.listInvoices();
    this.listenForInvoicePayments();
  }


  listenForInvoicePayments = () => {
    const self = this;
    this.timer = setInterval(function() {
      self.props.listInvoices();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  homeTabToggle = (toggle) => {
    this.setState({ toggle: toggle });
  }

  render() {
    const { manager, transaction } = this.props;
    let currentTransactionStatus = <span/>;


    let invoiceList = <span/>;
    if (manager.invoices.length > 0) {
      invoiceList = <InvoicesList invoices={manager.invoices} payInvoice={this.props.payInvoice} toggle={this.state.toggle}/>
    }
    else {
      invoiceList = <div className="empty-list-container">Looks like you haven't recieved any invoices yet.</div>
    }
    return (
      <Container>
        {/* {currentTransactionStatus} */}
        <Tabs defaultActiveKey="unpaid" id="home-view-tab" onSelect={this.homeTabToggle}>
            <Tab eventKey="unpaid" title="Unpaid">
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
            <Tab eventKey="paid" title="Paid">
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

import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import * as moment from 'moment';
import ShowInvoice from './ShowInvoice';
const ETHQ_ENDPOINT = process.env.REACT_APP_ETHQ_ENDPOINT;

export default class UserInvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {dialogVisible: false, data: [], dataItem: []};
  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  handleCloseDialog = () => {
    this.setState({ dialogVisible: false });
  }
  showInvoice = (idx) =>{
    console.log(idx);
    this.setState({data: this.props.previousInvoices[idx]});
    this.setState({dataItem: JSON.parse(this.props.previousInvoices[idx].storeItem)});
    console.log(this.props.previousInvoices[idx].selectedInvoiceDate);
    this.setState({dialogVisible: true});
  }
  render() {
    const { dialogVisible, data, dataItem} = this.state;
    const { previousInvoices , toggle} = this.props;
    let invoices = previousInvoices.map((item, idx) => {
      console.log(toggle, item.status, item.status2);
      if(toggle=='unpaid'){
        if(item.status=='paid') return;
      }
      else{
        if(item.status=='unpaid') return;
      }
      let dueDate;
      if(toggle=='paid') dueDate = moment(item.selectedInvoiceDate).format("YY-MM-DD HH:mm")
      else dueDate = dueDate = moment(item.selectedFinanceDate).format("YY-MM-DD HH:mm");
      // console.log(previousInvoices);
      let recipientAddress = item.recipient_address.substr(0, 5) + "...." + item.recipient_address.substr(item.recipient_address.length - 6, item.recipient_address.length - 1);
      let transactionHash = item.transaction_hash ? item.transaction_hash.substr(0, 5) + "...." + item.recipient_address.substr(item.recipient_address.length - 6, item.recipient_address.length - 1) : "-";
      // let 
      return <ListGroupItem key={`${item._id}-idx`} onClick={() => this.showInvoice(idx)}>
        <Row>
          <Col lg={2}>
            <div>
            <div className="cell-data"><a href={`${ETHQ_ENDPOINT}/search?q=(from:${item.recipient_address}%20OR%20to:${item.recipient_address})`} target="_blank">{recipientAddress}</a></div>
            <div className="cell-label">Recipient Address</div>
            </div>
          </Col>
          <Col lg={1}>
            {moment(item.date_created).format("YY-MM-DD HH:mm")}
          </Col>              
          <Col lg={1}>
            <div>{item.amount}</div>
          </Col>
          <Col lg={2}>
            <div>{item.invoiceNumber}</div>
          </Col>
          <Col lg={1} className="invoice-description-data">
            <div>
            {dueDate}
            </div>
          </Col>
          <Col lg={2} className="invoice-description-data">
            <div>
              <div>
              <div className="cell-data">{item.label}</div>
              <div className="cell-label">Label</div>
              </div>
            <div>
              <div className="cell-data">
              {item.description}
              </div>
              <div className="cell-label">
                Description
              </div>
            </div>
            </div>
          </Col>
          <Col lg={1}>
            <div> 
              <div className="cell-data">
              {item.status}
              </div>
              <div className="cell-label">
                Status
              </div>
            </div>
          </Col>

          <Col lg={2}>
            <div> 
              <div className="cell-data">
            <a href={`${ETHQ_ENDPOINT}/tx/${item.transaction_hash}`} target="_blank">{transactionHash}</a>
              </div>
              <div className="cell-label">
                Transaction Hash
              </div>
            </div>
            
          </Col>
        </Row>
      </ListGroupItem>
    })
    return (
      <div>
        {/* <ShowInvoice dialogVisible={dialogVisible} handleCloseDialog={this.handleCloseDialog}/> */}
        <ShowInvoice dialogVisible={dialogVisible} handleCloseDialog={this.handleCloseDialog} payInvoice={this.props.payInvoice} data={data} dataItem={dataItem} toggle={this.props.toggle}/>
        <ListGroup>
          <ListGroupItem className="list-table-header">
          <Row>
            <Col lg={2}>
              Identifier
            </Col>
            <Col lg={1}>
              Created on
            </Col>            
            <Col lg={1}>
              Amount (Eth)
            </Col>
            <Col lg={2}>
              Invoice Number
            </Col>
            <Col lg={1} className="cell-description-header">
              Due Date
            </Col>
            <Col lg={2} className="cell-description-header">
              Description
            </Col>
            <Col lg={2}>
              Invoice Status
            </Col>

            </Row>
          </ListGroupItem>
          {invoices}
        </ListGroup>
      </div>
    )
  }
}

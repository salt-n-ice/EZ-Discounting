pragma solidity >=0.4.22 <0.9.0;
contract  Invoices {

	//Global base parameters

	struct Invoice{
		address from;
		address to;
		string invoiceNumber;
	}

	mapping(address=>Invoice[]) invoices;


	
	//functions
	//making sure that account making a request can only get data related to that account

	function addInvoice(address _from, address _to, string memory _invoiceNumber) public {
		//checking if the account that started the transaction is same as the account which is creating the invoice
		if(msg.sender != _from) revert();
		Invoice memory inv;
		inv.from = _from;
		inv.to = _to;
		inv.invoiceNumber = _invoiceNumber;
		invoices[_from].push(inv);
	}


	//check if the person submitting the challan has already submitted an invoice with the same number
	function checkInvoice(address _from, string memory _invoiceNumber) public view returns (bool ok){
		require(msg.sender==_from);
		Invoice[] memory invs = invoices[_from];
		ok = true;
		for(uint i = 0; i<invs.length; i++){
			if (keccak256(abi.encodePacked(invs[i].invoiceNumber)) == keccak256(abi.encodePacked(_invoiceNumber))) {
				ok = false;
			}		
		}
	}

}
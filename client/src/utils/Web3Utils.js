const Web3 = require('web3');
// contractData =require('Invoices.json');

module.exports = {
  getEthBalance: function() {
    const web3 = window.web3;
    const address = window.ethereum.selectedAddress;

    return new Promise((resolve, reject) => {
      if (!web3.utils) {
        reject();
      }
      web3.eth.getBalance(address, function(error, wei) {
        if (!error) {
          var balance = web3.utils.fromWei(wei, 'ether');
          resolve(balance);
        }
        else {
          reject(error);
        }
      });
    })
  },

  makePaymentTransaction: function(transaction, amount) {
    const web3 = window.web3;
    const amountString = web3.utils.toWei(amount.toString());

    const params = {
      from: transaction.recipient_address,
      to: transaction.sender_address,
      value: amountString,
    };
    return new Promise((resolve, reject) => {
      web3.eth.sendTransaction(params, function(err, response) {
        if (err) {
          reject(err);
        }
        resolve(response);
      })
    });
  },
  // checkForInvoice: function(from, invoiceNumber, contractAbi, contractAddress) {
  //   const web3 = window.web3;
  //   console.log(contractAbi);
  //   // return new Promise((resolve, reject) => {
  //   //   web3.eth
  //   // })
  // }

}

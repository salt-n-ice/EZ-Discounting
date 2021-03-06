import axios from 'axios';
import { searchWalletHistory, searchTransactionList } from '../utils/DfuseUtils';
import { getEthBalance } from '../utils/Web3Utils';

const API_SERVER = process.env.REACT_APP_API_SERVER;

export const SUBMIT_INVOICE = 'SUBMIT_INVOICE';
export const SUBMIT_INVOICE_SUCCESS = 'SUBMIT_INVOICE_SUCCESS';
export const SUBMIT_INVOICE_FAILURE = 'SUBMIT_INVOICE_FAILURE';

export const GET_WALLET_HISTORY = 'GET_WALLET_HISTORY';
export const GET_WALLET_HISTORY_SUCCESS = 'GET_WALLET_HISTORY_SUCCESS';
export const GET_WALLET_HISTORY_FAILURE = 'GET_WALLET_HISTORY_FAILURE';

export const GET_PREVIOUS_INVOICES = 'GET_PREVIOUS_INVOICES';
export const GET_PREVIOUS_INVOICES_SUCCESS = 'GET_PREVIOUS_INVOICES_SUCCESS';
export const GET_PREVIOUS_INVOICES_FAILURE = 'GET_PREVIOUS_INVOICES_FAILURE';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

export const GET_WALLET_ETH_BALANCE = 'GET_WALLET_ETH_BALANCE';
export const GET_WALLET_ETH_BALANCE_SUCCESS = 'GET_WALLET_ETH_BALANCE_SUCCESS';
export const GET_WALLET_ETH_BALANCE_FAILURE = 'GET_WALLET_ETH_BALANCE_FAILURE';

export const GET_TRANSACTION_LIST_STATUS = 'GET_TRANSACTION_LIST_STATUS';
export const GET_TRANSACTION_LIST_STATUS_SUCCESS = 'GET_TRANSACTION_LIST_STATUS_SUCCESS';
export const GET_TRANSACTION_LIST_STATUS_FAILURE = 'GET_TRANSACTION_LIST_STATUS_FAILURE';

export const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

export function submitInvoice(payload) {
  const request = axios.post(`${API_SERVER}/user/invoice`, payload);
  return {
    type: SUBMIT_INVOICE,
    payload: request
  }
}

export function submitInvoiceSuccess(payload) {
  return {
    type: SUBMIT_INVOICE_SUCCESS,
    payload: payload
  }
}

export function submitInvoiceFailure(err) {
  return {
    type: SUBMIT_INVOICE_FAILURE,
    payload: err
  }
}

export function getWalletHistory(type) {
  const walletAddress = window.ethereum.selectedAddress;

  const request = searchWalletHistory(walletAddress, type);
  return {
    type: GET_WALLET_HISTORY,
    payload: request
  }
}

export function getWalletHistorySuccess(response) {
  return {
    type: GET_WALLET_HISTORY_SUCCESS,
    payload: response
  }
}


export function getWalletHistoryFailure(err) {
  return {
    type: GET_WALLET_HISTORY_FAILURE,
    payload: err
  }
}

export function getPreviousInvoices() {
  const walletAddress = window.ethereum.selectedAddress;
  const request = axios.get(`${API_SERVER}/user/invoices?address=${walletAddress}`);
  return {
    type: GET_PREVIOUS_INVOICES,
    payload: request
  }
}

export function getPreviousInvoicesSuccess(response) {
  return {
    type: GET_PREVIOUS_INVOICES_SUCCESS,
    payload: response
  }
}

export function getPreviousInvoicesFailure(error) {
  return {
    type: GET_PREVIOUS_INVOICES_FAILURE,
    payload: error
  }
}

export function getUserInfo() {
  const walletAddress = window.ethereum.selectedAddress;
  const request = axios.get(`${API_SERVER}/user/info?address=${walletAddress}`);
  return {
    type: GET_USER_INFO,
    payload: request
  }
}

export function getUserInfoSuccess(response) {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload: response
  }
}

export function getUserInfoFailure(err) {
  return {
    type: GET_USER_INFO_FAILURE,
    payload: err
  }
}

export function getWalletEthBalance() {
  const request = getEthBalance();
  return {
    type: GET_WALLET_ETH_BALANCE,
    payload: request
  }
}

export function getWalletEthBalanceSuccess(response) {
  return {
    type: GET_WALLET_ETH_BALANCE_SUCCESS,
    payload: response
  }
}

export function getWalletEthBalanceFailure(err) {
  return {
    type: GET_WALLET_ETH_BALANCE_FAILURE,
    payload: err
  }
}

export function getTransactionListStatus(txnList) {
  const request = searchTransactionList(txnList)
  return {
    type: GET_TRANSACTION_LIST_STATUS,
    payload: request
  }
}

export function getTransactionListStatusSuccess(response) {
  return {
    type: GET_TRANSACTION_LIST_STATUS_SUCCESS,
    payload: response
  }
}

export function getTransactionListStatusError(err) {
  return {
    type: GET_TRANSACTION_LIST_STATUS_FAILURE,
    payload: err
  }
}

export function initializeSuccess() {
  return {
    type: INITIALIZE_SUCCESS,
    payload: 'init'
  }
}
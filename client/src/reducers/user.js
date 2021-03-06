import {
  SUBMIT_INVOICE,
  SUBMIT_INVOICE_SUCCESS,
  SUBMIT_INVOICE_FAILURE,
  GET_WALLET_HISTORY,
  GET_WALLET_HISTORY_SUCCESS,
  GET_WALLET_HISTORY_FAILURE,
  GET_PREVIOUS_INVOICES,
  GET_PREVIOUS_INVOICES_FAILURE,
  GET_PREVIOUS_INVOICES_SUCCESS,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  GET_WALLET_ETH_BALANCE,
  GET_WALLET_ETH_BALANCE_SUCCESS,
  GET_WALLET_ETH_BALANCE_FAILURE,
  INITIALIZE_SUCCESS
}
from '../actions/user';

const initialState = {
  createInvoice: {},
  walletHistory: [],
  previousInvoices: [],
  isFetching: false,
  error: false,
  success: false,
  userInfo: [],
  balance: '',
  success: 'init',
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_INVOICE:
      return { ...state }
    case GET_WALLET_HISTORY:
      return { ...state, walletHistory: [] }
    case GET_WALLET_HISTORY_SUCCESS:
      return { ...state, walletHistory: action.payload }
    case GET_WALLET_HISTORY_FAILURE:
      return { ...state }
    case GET_PREVIOUS_INVOICES:
      return { ...state }
    case GET_PREVIOUS_INVOICES_SUCCESS:
      return { ...state, previousInvoices: action.payload.data }
    case SUBMIT_INVOICE_SUCCESS:
      return {...state, success: action.payload.message}
    case GET_PREVIOUS_INVOICES_FAILURE:
      return { ...state }
    case GET_USER_INFO:
      return { ...state }
    case GET_USER_INFO_SUCCESS:
      return { ...state, userInfo: action.payload.data }
    case GET_USER_INFO_FAILURE:
      return { ...state }
    case GET_WALLET_ETH_BALANCE_SUCCESS:
      return { ...state, balance: action.payload }
    case INITIALIZE_SUCCESS:
      return {...state, success: 'init'}
    default:
      return state
  }
}

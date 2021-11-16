import UserView from './UserView';
import {
  submitInvoice,
  submitInvoiceSuccess,
  submitInvoiceFailure,
  getPreviousInvoices,
  getPreviousInvoicesSuccess,
  getPreviousInvoicesFailure,
  getTransactionListStatus,
  getTransactionListStatusSuccess,
  getTransactionListStatusError,
  initializeSuccess
}
from '../../actions/user';
import {
  payInvoice,
  payInvoiceSuccess,
  payInvoiceFailure,
  updateInvoice,
  updateInvoice2,
  updateInvoiceSuccess,
  updateInvoiceFailure
}
from '../../actions/transaction'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitInvoice: (payload) => {
      dispatch(submitInvoice(payload)).then(function(response) {
        if (response.payload.status === 200) {
          dispatch(submitInvoiceSuccess(response.payload.data));
        }
      }).catch(function(err) {
        dispatch(submitInvoiceFailure(err));
      })
    },

    getPreviousInvoices: () => {
      dispatch(getPreviousInvoices()).then(function(response) {
        const previousInvoiceList = response.payload.data;


        dispatch(getPreviousInvoicesSuccess(previousInvoiceList));
      }).catch(function(err) {
        dispatch(getPreviousInvoicesFailure(err));
      })
    },
    initializeSuccess: () => {
      dispatch(initializeSuccess());
    },

    payInvoice: (transaction, amount) => {
      dispatch(payInvoice(transaction, amount)).then(function(response) {
        dispatch(payInvoiceSuccess(response.payload));
        const updateInvoicePayload = {
          'id': transaction._id,
          'status2': 'paid',
          'transaction_hash2': response.payload
        };
        dispatch(updateInvoice2(updateInvoicePayload)).then(function(updateInvoiceResponse) {
          dispatch(updateInvoiceSuccess(updateInvoiceResponse.payload));
        }).catch(function(err) {
          dispatch(updateInvoiceFailure(err));
        })

      }).catch(function(err) {
        dispatch(payInvoiceFailure(err));
      })

    }

    

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);

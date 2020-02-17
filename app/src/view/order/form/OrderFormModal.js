import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'i18n';
import OrderForm from 'view/order/form/OrderForm';
import OrderService from 'modules/order/orderService';
import Errors from 'modules/shared/error/errors';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class OrderFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveLoading: false,
    };
  }

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await OrderService.create(data);
      const record = await OrderService.find(id);
      this.props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      this.setState({
        saveLoading: false,
      });
    }
  };

  doClose = () => {
    return this.props.onClose();
  };

  render() {
    return ReactDOM.createPortal(
      <Dialog
        open={true}
        onClose={this.doClose}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle
          disableTypography
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0 }}>
            {i18n('entities.order.new.title')}
          </h2>
          <IconButton onClick={this.doClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <OrderForm
            saveLoading={this.state.saveLoading}
            onSubmit={this.doSubmit}
            onCancel={this.doClose}
            modal
          />
        </DialogContent>
      </Dialog>,
      document.getElementById('modal-root'),
    );
  }
}

export default OrderFormModal;

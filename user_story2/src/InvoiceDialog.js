import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/**
 * Class to show Invoice object dialog
 * 
 */
class InvoiceDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      invoice_number: "12345",
      total: "00.00",
      currency: "USD",
      invoice_date: "2019-08-24",
      due_date: "2019-08-24",
      vendor_name: "Vendor",
      remittance_address: "Address",
     
      invoice_numberError: false,
      totalError: false,
      currencyError: false,
      invoice_dateError: false,
      due_dateError: false,
      vendor_nameError: false,
      remittance_addressError: false,
      
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.invoice && this.state.prevInvoice !== newProps.invoice) {
      this.setState({_id: null, ...newProps.invoice, prevInvoice: newProps.invoice});
    }
  }

  handleInputChange(event) {
    this.setState({[event.currentTarget.getAttribute('name')]: event.target.value});
  }

  handleSubmit(event) {
    // Perform input validation
    const input = {
      
      invoice_number: this.state.invoice_number.trim(),
      total:  parseInt(this.state.total),
      currency: this.state.currency.trim(),
      invoice_date: this.state.invoice_date.trim(),
      due_date: this.state.due_date.trim(),
      vendor_name: this.state.vendor_name.trim(),
      remittance_address: this.state.remittance_address.trim()
    };
   
    const errors = {};
   
    if(!input.invoice_number) {
      errors.invoice_numberError = true;
    }
    if(!input.currency) {
      errors.currencyError = true;
    }
    if(!input.invoice_date) {
      errors.invoice_dateError = true;
    }
    if(!input.due_date) {
      errors.due_dateError = true;
    }
    if(!input.vendor_name) {
      errors.vendor_nameError = true;
    }
    if(!input.remittance_address) {
      errors.remittance_addressError = true;
    }
   
    if(isNaN(input.total)) {
      errors.totalError = true;
    }
    if(input.total <= 0) {
      errors.totalError = true;
    }
    

    if(Object.keys(errors).length > 0) {
      this.setState(errors);
      return;
    }

    // Reset error states
    this.setState({
     
      invoice_numberError: false,
      totalError: false,
      currencyError: false,
      invoice_dateError: false,
      due_dateError: false,
      vendor_nameError: false,
      remittance_addressError: false
    });

    if(typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(event, {
        _id: this.state._id,
       
        invoice_number: input.invoice_number,
        total: input.total,
        currency: input.currency,
        invoice_date: input.invoice_date,
        due_date: input.due_date,
        vendor_name: input.vendor_name,
        remittance_address: input.remittance_address
      });
    }
  }

  handleClose(event) {
    // Reset error states
    this.setState({
      
      invoice_numberError: false,
      totalError: false,
      currencyError: false,
      invoice_dateError: false,
      due_dateError: false,
      vendor_nameError: false,
      remittance_addressError: false
    });
    if(typeof this.props.onClose === 'function') {
      this.props.onClose(event);
    }
  }

  render() {
    return (
      <Dialog open={this.props.show} onClose={this.handleClose} aria-labelledby="invoice-dialog-title">
        <DialogTitle id="invoice-dialog-title" disableTypography={true}>
          <Typography variant="h5">Create Invoices</Typography>
        </DialogTitle>
        <DialogContent>
            <TextField
            error={this.state.invoice_numberError}
            id="invoice-dialog-invoice_number"
            label="Invoice Number"
            name="invoice_number"
            value={this.state.invoice_number}
            onChange={this.handleInputChange}
            margin="normal"
            fullWidth={true}
            disabled={this.props.loading}
            helperText={this.state.invoice_numberError ? 'Invoice Number is required' : ''}
          />
            <TextField
            error={this.state.totalError}
            id="invoice-dialog-total"
            type="number"
            label="total"
            name="total"
            value={this.state.total}
            onChange={this.handleInputChange}
            margin="normal"
            fullWidth={true}
            disabled={this.props.loading}
            helperText={this.state.totalError ? 'Must be > 0' : ''}
          />
             <TextField
            error={this.state.currencyError}
            id="invoice-dialog-currency"
            label="Currency Error"
            name="currency"
            value={this.state.currency}
            onChange={this.handleInputChange}
            margin="normal"
            fullWidth={true}
            disabled={this.props.loading}
            helperText={this.state.currencyError ? 'currency is required' : ''}
          />
          <TextField
            error={this.state.invoice_dateError}
            id="invoice-dialog-invoice_date"
            label="Invoice Date"
            name="invoice_date"
            value={this.state.invoice_date}
            onChange={this.handleInputChange}
            margin="normal"
            fullWidth={true}
            disabled={this.props.loading}
            helperText={this.state.invoice_dateError ? 'Invoice Date is required' : ''}
          />
         <TextField
            error={this.state.due_dateError}
            id="invoice-dialog-due_date"
            label="Due Date"
            name="due_date"
            value={this.state.due_date}
            onChange={this.handleInputChange}
            margin="normal"
            fullWidth={true}
            disabled={this.props.loading}
            helperText={this.state.due_dateError ? 'Due date is required' : ''}
          />
       <TextField
            error={this.state.vendor_nameError}
            id="invoice-dialog-vendor_name"
            label="Vendor Name"
            name="vendor_name"
            value={this.state.vendor_name}
            onChange={this.handleInputChange}
            margin="normal"
            fullWidth={true}
            disabled={this.props.loading}
            helperText={this.state.vendor_nameError ? 'Vendor name is required' : ''}
          />

          <TextField
            error={this.state.remittance_addressError}
            id="invoice-dialog-remittance_address"
            label="Remittance Address"
            name="remittance_address"
            value={this.state.remittance_address}
            onChange={this.handleInputChange}
            margin="normal"
            fullWidth={true}
            disabled={this.props.loading}
            helperText={this.state.remittance_addressError ? 'Remittance Address is required' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary" disabled={this.props.loading}>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={this.props.loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default InvoiceDialog;

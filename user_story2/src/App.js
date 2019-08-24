import dotenv from 'dotenv';
import React from 'react';
import io from 'socket.io-client';
import './App.css';
import { withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InvoiceDialog from './InvoiceDialog';
import ConfirmDialog from './ConfirmDialog';
import Message from './Message';

dotenv.config();
const styles = theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'left'
  },
  container: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  rootNode: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  invoiceContainer: {
    borderLeft: 'solid 1px rgba(0, 0, 0, 0.1)',
    paddingTop: '1rem',
    paddingLeft: '2rem'
  },
  invoice: {
    position: 'relative',
    '&::before': {
      position: 'absolute',
      top: '28px',
      left: '-2rem',
      width: '2rem',
      height: '0',
      borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)'
    }
  }
});
/**
 * Class to hadle all operation associated with Invoice
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;

    this.state = {
      invoices: {},
      invoiceDialogShow: false,
      invoiceDialogInvoice: null,
      invoiceDialogLoading: false,
      confirmDialogShow: false,
      confirmDialogMessage: '',
      confirmDialogOnAccept: null,
      messageShow: false,
      messageMessage: '',
      messageVariant: 'success'
    };

    this.handleInvoiceCreate = this.handleInvoiceCreate.bind(this);
    this.handleInvoiceDeny = this.handleInvoiceDeny.bind(this);
    this.handleInvoiceApprove = this.handleInvoiceApprove.bind(this);

    this.handleInvoiceDialogSubmit = this.handleInvoiceDialogSubmit.bind(this);
    this.handleInvoiceDialogClose = this.handleInvoiceDialogClose.bind(this);

    this.handleConfirmDialogAccept = this.handleConfirmDialogAccept.bind(this);
    this.handleConfirmDialogReject = this.handleConfirmDialogReject.bind(this);

    this.handleMessageClose = this.handleMessageClose.bind(this);

    // Create Socket
    this.socket = io(process.env.SOCKET_URL);
   // show snackbar message on connection
    this.socket.on('connect', () => {
      this.setState({
        messageShow: true,
        messageMessage: 'Connected to the server',
        messageVariant: 'success'
      });
    });
    // show snackbar message on reconnection
    this.socket.on('reconnected', () => {
      this.setState({
        messageShow: true,
        messageMessage: 'Re-connected to the server',
        messageVariant: 'success'
      });
    });
    // show snackbar message on disconnection
    this.socket.on('disconnect', reason => {
      this.setState({
        messageShow: true,
        messageMessage: `Server disconnected: ${reason}`,
        messageVariant: 'error'
      });
    });
    // show list of invoices set them in state
    this.socket.on('list', invoices => {
      this.setState({
        invoices: {
          ...this.state.invoices,
          ...invoices
        }
      })
    });
    // in current list on invoices delete approved
    this.socket.on('delete', invoices => {
      if (Array.isArray(invoices)) {
        invoices.forEach(invoiceId => {
          delete this.state.invoices[invoiceId];
        });
        this.setState({
          invoices: {
            ...this.state.invoices
          }
        });
      }
    });
  }
/**
 * Create a invoice object
 */
  handleInvoiceCreate(event) {
    event.preventDefault();
    const invoice = {
      invoice_number: "12345",
      total: 0,
      currency: "USD",
      invoice_date: "2019-08-24",
      due_date: "2019-08-24",
      vendor_name: "Vendor",
      remittance_address: "Address"
    }
    this.setState({
      invoiceDialogShow: true,
      invoiceDialogInvoice: invoice
    });
  }
/**
 * 
 * Update invoice object for status approve
 */
  handleInvoiceApprove(event) {
    event.preventDefault();
    const invoice = this.state.invoices[event.currentTarget.getAttribute('data-invoice-id')];
    if (invoice) {
      this.socket.emit('update', invoice, () => {
        this.setState({
          
          messageShow: true,
          messageMessage: `Approved invoice ${invoice.invoice_number}`,
          messageVariant: 'success'
        });
      });
    }
  }

  /**
   * Update invoice object for deny status
   * Ask confirmation
   * Display error if any
   */
  handleInvoiceDeny(event) {
    event.preventDefault();
    const invoiceId = event.currentTarget.getAttribute('data-invoice-id');
    const invoice = this.state.invoices[invoiceId];
    if (invoice) {
      this.setState({
        confirmDialogShow: true,
        confirmDialogMessage: `Are you sure you wish to deny invoice ${invoice.invoice_number}`,
        confirmDialogOnAccept: () => {
          this.socket.emit('deny', invoice._id, status => {
            if (status === 'done') {
              this.setState({
                messageShow: true,
                messageMessage: `Denied invoice ${invoice.invoice_number}`,
                messageVariant: 'success'
              });
            } else {
              this.setState({
                messageShow: true,
                messageMessage: `Error Dening invoice ${invoice.invoice_number}`,
                messageVariant: 'error'
              });
            }
          });
        }
      });
    }
  }

  


  /**
   * Submit invoice objected created
   * Update db with changes using a websocket
   * Display error if any
   */
  handleInvoiceDialogSubmit(event, invoice) {
    if (event !== null) {
      event.preventDefault();
    }
    this.setState({
      invoiceDialogLoading: true
    });
    if (!invoice._id) {
      delete invoice._id;
      this.socket.emit('create', invoice, () => {
        this.setState({
          invoiceDialogLoading: false,
          invoiceDialogShow: false,
          messageShow: true,
          messageMessage: `Created invoice ${invoice.invoice_number}`,
          messageVariant: 'success'
        });
      });
    } 
  }

  handleInvoiceDialogClose(event) {
    if (event !== null) {
      event.preventDefault();
    }
    this.setState({
      invoiceDialogShow: false
    });
  }

  handleConfirmDialogAccept(event) {
    event.preventDefault();
    if (typeof this.state.confirmDialogOnAccept === 'function') {
      this.state.confirmDialogOnAccept();
    }
    this.setState({
      confirmDialogShow: false
    });
  }

  handleConfirmDialogReject(event) {
    event.preventDefault();
    this.setState({
      confirmDialogShow: false
    });
  }

  handleMessageClose(event) {
    if (event !== null) {
      event.preventDefault();
    }
    this.setState({
      messageShow: false
    });
  }
  
  render() {
   
    const invoicesMarkup = Object.values(this.state.invoices).map(invoice => {

      return <ExpansionPanel key={invoice._id} id={invoice._id} className={this.classes.invoice}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={invoice._id + '-content'}
          id={invoice._id + '-summary'}>
           <div>
            <Typography variant="h4" gutterBottom>{invoice.invoice_number} - {invoice.status}</Typography>

          </div>
                   
          </ExpansionPanelSummary>
          <ExpansionPanelDetails id={invoice._id + '-content'}>
          
          <Typography variant="h6" gutterBottom align="left">
            Invoice Number : {invoice.invoice_number} <br />
            Vendor Name : {invoice.vendor_name} <br />
            Vendor Address : {invoice.remittance_address} <br />
            Invoice Total : {invoice.total} <br />
            Invoice Date : {invoice.invoice_date} <br />
            Due Date : {invoice.due_date}
          </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button color="primary" data-invoice-id={invoice._id} onClick={this.handleInvoiceDeny}>Deny</Button>
            <Button color="primary" data-invoice-id={invoice._id} onClick={this.handleInvoiceApprove}>Approve</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    });

    return (
      <div className="App">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={this.classes.title}>2ULaundry</Typography>
            {/*Button to create a new invoice*/}
            <Button color="inherit" onClick={this.handleInvoiceCreate}>Create Invoices</Button>
          </Toolbar>
        </AppBar>

        <main>
          <Container maxWidth="lg" className={this.classes.container}>
            {/*Root node*/}
            <Typography variant="h4" className={this.classes.rootNode}>Invoices</Typography>
            <Box className={this.classes.invoiceContainer}>
              {/* Display invoices */}
              {invoicesMarkup}
            </Box>

            {/* Dialog displayed to input invoice details for creating and updating */}
            <InvoiceDialog
              show={this.state.invoiceDialogShow}
              loading={this.state.invoiceDialogLoading}
              invoice={this.state.invoiceDialogInvoice}
              onSubmit={this.handleInvoiceDialogSubmit}
              onClose={this.handleInvoiceDialogClose} />

            {/* Dialog displayed to ask user for confirmations */}
            <ConfirmDialog
              show={this.state.confirmDialogShow}
              message={this.state.confirmDialogMessage}
              onAccept={this.handleConfirmDialogAccept}
              onReject={this.handleConfirmDialogReject} />

            {/* Snackbar that displays application messages */}
            <Message
              show={this.state.messageShow}
              variant={this.state.messageVariant}
              message={this.state.messageMessage}
              onClose={this.handleMessageClose} />

          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);

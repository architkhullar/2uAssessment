import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/**
 * Class to handle Confirmation dialog box
 */
export default class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleAccept(event) {
    if(typeof this.props.onAccept === 'function') {
      this.props.onAccept(event);
    }
  }

  handleReject(event) {
    if(typeof this.props.onReject === 'function') {
      this.props.onReject(event);
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.show}
        onClose={this.handleReject}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {this.props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleReject} color="secondary">
            No
          </Button>
          <Button onClick={this.handleAccept} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

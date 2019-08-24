import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9
  }
});
/**
 * Class to show messages
 * Error
 * Connection
 * Invoice changes
 * as Snackbar
 */
class Message extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event) {
    if(typeof this.props.onClose === 'function') {
      this.props.onClose(event);
    }
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.show}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={this.classes[this.props.variant]}
          message={this.props.message}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(Message);

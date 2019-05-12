import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
//import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Clear';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


const theme = createMuiTheme({
  palette: {
    primary: {
		main: '#FA7268'
	},
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class SimpleSnackbar extends React.Component {
  state = {
    open: true,
	vertical: 'bottom',
    horizontal: 'right',
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Email Sent. Do you want to save format?</span>}
          action={[
		    <MuiThemeProvider theme={theme}>
				<Button color="primary" size="small" style={{ marginRight: 5 }} onClick={this.handleClose}>
					Save Format
				  </Button>
			</MuiThemeProvider>,
			<MuiThemeProvider theme={theme}>
				<IconButton
				  key="close"
				  aria-label="Close"
				  color="primary"
				  className={classes.close}
				  onClick={this.handleClose}
				>
				  <CloseIcon />
				</IconButton>
			</MuiThemeProvider>,
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);
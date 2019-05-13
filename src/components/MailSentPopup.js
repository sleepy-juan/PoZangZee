import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
//import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Clear';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Format from './Format';



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

  componentDidMount(){
    document.addEventListener('keyup', this.handleKeyup);
		document.addEventListener('keydown', this.handleKeydown);
  }

  handleKeyup=e=>{
    if(e.keyCode===83){
      this.props.deliverFormat(true);
      window.format=true;
    }

    
  }
  handleKeydown=e=>{

		
		
	}

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ 
      open: false
      
    });
    if(this.props.deliverFormat) {
      this.props.deliverFormat(true);
      window.compose=true;
    }
	

    if(this.props.onPopupClosed){
      this.props.onPopupClosed();
    }
  };

  handleActualClose = (event, reason) => {
  	  if (reason === 'clickaway') {
	  	  return;
	  }
	  this.setState({
		open:false
	  });
  }

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
          autoHideDuration={4000}
          onClose={this.handleClose.bind(this)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Email Sent. Do you want to save format?</span>}
          action={[
		    <MuiThemeProvider theme={theme}>
				<Button color="primary" size="small" style={{ marginRight: 5 }} onClick={this.handleClose.bind(this)}>
				
					Save Format
				  </Button>
			</MuiThemeProvider>,
			<MuiThemeProvider theme={theme}>
				<IconButton
				  key="close"
				  aria-label="Close"
				  color="primary"
				  className={classes.close}
				  onClick={this.handleActualClose.bind(this)}
				>
				  <CloseIcon />
				</IconButton>
			</MuiThemeProvider>,
          ]}
        />

        {this.state.isFormat ? <Format context = {this.props.content}/> : null}
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);
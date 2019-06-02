import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import shortcuts from './shortcuts.jpeg';
import { Button } from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


 const theme = createMuiTheme({
  palette: {
    primary: {
		//main: '#FA7268'
		main: "#FFFFFF"
	},
  },
  typography: {
    useNextVariants: true,
  },
});



class ImageDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    return (
      <div>
		<MuiThemeProvider theme={theme}>
			<Button onClick={this.handleClickOpen} variant="contained" size="small" color="primary" style={{position:"fixed", left: "310px", top: "7px", fontFamily: "arial", color: "#FA7268"}}>
				Shortcut Guide 
				<i class="material-icons" style={{marginleft: "5px"}}>keyboard</i>
			</Button>
			
		</MuiThemeProvider>
		<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth="100%"
        >
          <img src={shortcuts} alt=""/>
        </Dialog>
      </div>
    );
  }
}

export default ImageDialog;
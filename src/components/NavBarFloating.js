import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import WriteMail from './WriteMail';
import MailSentPopup from './MailSentPopup';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FA7268" }, // Purple and green play nicely together.
  },
});

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 8,
        color: "white",
    },
});

class FabButton extends React.Component{
  state = {
    compose: false
  }
  
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
          <Fab size="large" variant="extended" aria-label="Add" color="primary" className={classes.fab}
            onClick={() => {
              this.setState({
                compose: !this.state.compose
              })
            }}
          >
              Compose
          </Fab>
          {this.state.compose ? <WriteMail onClose={() => {
            this.setState({
              compose: false
            })

			this.setState({
				popup: true
			})
          }} /> : null}
		  {
		  	  this.state.popup?
			  <MailSentPopup /> : null
		  }
      </MuiThemeProvider>
    );
  }
}

FabButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FabButton);
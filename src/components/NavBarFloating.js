import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import WriteMail from './WriteMail';
import MailSentPopup from './MailSentPopup';
import Format from './Format'
const theme = createMuiTheme({
  palette: {
    primary: { main: "#FA7268" }, // Purple and green play nicely together.
  },
});

const styles = theme => ({
    fab: {
        margin: "25%",
        color: "white",
        width: "50%",
    },
	extendedIcon: {
		marginRight: theme.spacing.unit,
	},
});

class FabButton extends React.Component{
  state = {
    compose: false,
    isFormat: false
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
      <MuiThemeProvider theme={theme}>
          <Fab size="large" variant="extended" aria-label="Add" color="primary" className={classes.fab}
            onClick={() => {
              window.compose = !this.state.compose;
              this.setState({
                compose: !this.state.compose
              });
            }}
          >
            Compose
          </Fab>
          {this.state.compose ? <WriteMail onJustClose={()=>{
            this.setState({
              compose: false
            });
            window.compose = false;
          }} onClose={() => {
            this.setState({
              compose: false,
              popup: true
            });
            window.compose = false;
            }}
            deliverContent={(content) =>this.content = content} 
            /> : null}
          {this.state.popup ? <MailSentPopup onPopupClosed={()=>this.setState({popup: false})}
          deliverFormat={(isFormat) => this.setState({isFormat}) } /> : null}
      </MuiThemeProvider>
      
      {this.state.isFormat ? <Format context = {this.content}/> : null}
      </div>
    );
  }
}

FabButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FabButton);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './readmail.css';
import Button2 from './button.js'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import Dropdown from './dropdown.js';
import $ from 'jquery';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import WriteMail from '../WriteMail';
import { setCategory } from '../../utils/Database';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FA7268" }, // Purple and green play nicely together.
  },
});

var wid = $(window).width()-300;
var heigh = $(window).height()-15;
const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    button2:{
        textDecoration:'underline',
    },
    
    read:{
        position: 'absolute',
        color: "red",
        width: wid,
        height: heigh,
        border: '0.5px solid rgba(240,240,240,1)',
        padding: 20,
        boxSizing: 'border-box',
        overflow: 'scroll',
    },
    text:{
        left: 40,
        right: 40,
        textAlign: 'justify',
        position: 'absolute',
        lineHeight:1,
        height: "100%"
    },
    text2:{
        position:'absolute',
        right:20,
    },
    text3:{
        position:'absolute',
        right:200,
    },
    scro:{
        overflow: 'auto',

    },
    fab:{
        position:'fixed',
        right: 30,
        bottom:30,
        color:'white',
    },
    
  });

class PaperSheet extends React.Component{
  state = {
    compose: false,
  }

  onDelete(){
    setCategory(this.props.mail.id, "Trash");
  }
  
  render() {
    const { classes } = this.props;
  
    return (
        
      <div>
        <Paper className={classes.read} elevation={1}>
        <Button2 onBack={this.props.onBack} onDelete={this.onDelete.bind(this)}/>
            <div className={classes.text}>
          <Typography variant="h5" component="h3">
              {this.props.mail.subject} <Dropdown/> 
          </Typography>
          <br/>
          <Typography component="p">
            <b> {this.props.mail.from} </b> 	&lt;{this.props.mail.from}@pozangzee.com&gt;
            <a href="www.google.com"> Block </a> <span className={classes.text3}> Received: {this.props.mail.sent} </span> <span className={classes.text2}>  Reply by: {this.props.mail.replyBy} </span>
          </Typography>
          <Typography component="p" className={classes.text2}>
          

          </Typography>

          <br/>

          <Typography component="pre" className={classes.scro}>
          {this.props.mail.content}
          </Typography>

          <MuiThemeProvider theme={theme}>
          <Fab color="primary" variant="extended" aria-label="Delete" className={classes.fab} onClick={()=>this.setState({compose: !this.state.compose})}>
             <NavigationIcon className={classes.extendedIcon} />
               Reply
          </Fab>
          </MuiThemeProvider>
          </div>
        </Paper>

        {this.state.compose ? <WriteMail onClose={() => {
            this.setState({
              compose: false
            })
          }} replyInfo = {this.props.mail} /> : null}
      </div>
      
          
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
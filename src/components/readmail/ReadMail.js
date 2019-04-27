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
        position: 'relative',
        color: "red",
        width: '100%',
        height: "100vh",
        border: '0.5px solid rgba(240,240,240,1)',
        padding: 20,
        boxSizing: 'border-box',
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
        height:"60%",
    },
    fab:{
        position:'relative',
        right: 40,
        top:10,
        backgroundColor:"#FA7268",
        color:'white',
    },
    extendedIcon:{
        backgroundColor:"#FA7268",
    }
  });

class PaperSheet extends React.Component{
  
  render() {
    const { classes } = this.props;
  
    return (
        
      <div>
        <Paper className={classes.read} elevation={1}>
        <Button2 onBack={this.props.onBack} onDelete={this.props.onDelete}/>
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

          <Typography component="p" className={classes.scro}>
          {this.props.mail.content}
          </Typography>
          <Fab variant="extended" aria-label="Delete" className={classes.fab}>
             <NavigationIcon className={classes.extendedIcon} />
               Reply
             </Fab>
          </div>
        </Paper>
        
      </div>
      
          
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
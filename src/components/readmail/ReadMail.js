import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './readmail.css';
import Button2 from './button.js'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dropdown from './dropdown.js';
import $ from 'jquery';

var wid = $(window).width()-300;
var heigh = $(window).height()-15;
var textheight = $(window).height()-15;
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
        overflow: 'hidden',
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
        position:'fixed',
        float:'right',
        

        backgroundColor:"#FA7268",
        color:'white',
    },
    
  });
  
  function PaperSheet(props) {
    const { classes } = props;
  
    return (
        
      <div>
        <Paper className={classes.read} elevation={1}>
        <Button2/>
            <div className={classes.text}>
          <Typography variant="h5" component="h3">
              Who are you? <Dropdown/> 
          </Typography>
          <br/>
          <Typography component="p">
            <b> Juana Leer </b> 	&lt;juana@leer.com&gt;
            <a href="www.google.com"> Block </a> <span className={classes.text3}> Received: 4/24 8:15pm </span> <span className={classes.text2}>  Reply by: 5/1 </span>
          </Typography>
          <Typography component="p" className={classes.text2}>
          

          </Typography>

          <br/>

          <Typography component="p" className={classes.scro}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
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
  
  PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(PaperSheet);
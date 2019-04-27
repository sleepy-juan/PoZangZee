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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum tellus massa, sit amet ornare ex imperdiet dictum. Donec convallis, urna a bibendum hendrerit, ipsum quam pellentesque nisl, vitae euismod augue mauris ut nisl. Sed convallis, nulla tincidunt malesuada sodales, lectus ante consectetur velit, non eleifend lorem nibh ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tortor velit. Donec consectetur faucibus lorem ac elementum. Mauris sagittis ipsum eu euismod interdum. Phasellus laoreet diam nec ex ullamcorper, quis rhoncus sem imperdiet. Nulla dui ante, semper id ligula non, gravida volutpat lacus. Ut malesuada, lorem at blandit rhoncus, nulla ipsum consectetur velit, vel venenatis orci elit quis libero. Nam turpis augue, congue facilisis lorem vel, pulvinar placerat mi.
          </Typography>

          <MuiThemeProvider theme={theme}>
          <Fab color="primary" variant="extended" aria-label="Delete" className={classes.fab}>
             <NavigationIcon className={classes.extendedIcon} />
               Reply
          </Fab>
          
          </MuiThemeProvider>
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
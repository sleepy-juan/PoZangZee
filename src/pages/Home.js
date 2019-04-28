import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReadMail from '../components/readmail/ReadMail'
import NavBar from '../components/NavBar';
import MailList from '../components/MailList';

const drawerWidth = 270;
const styles = theme => ({
  root: {
    display: 'flex',
    borderTop: "15px solid #FA7268",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  }
});

class PermanentDrawerLeft extends React.Component{
  state = {
    readMail: false,
    selected_menu: "Inbox"
  }

  render() {
    const { classes } = this.props;
  
    return (
        <div className={classes.root}>
          <CssBaseline />
          <NavBar onSelect={selected_menu=>this.setState({selected_menu})} />
          <main className={classes.content}>
            {this.state.readMail? 
            <ReadMail mail={this.state.mail} onBack={() => {this.setState({readMail: false})}}/>: 
            <MailList onRead={mail => this.setState({mail, readMail: true})} selected={this.state.selected_menu} />}
          </main>
        </div>
    );
  }
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);
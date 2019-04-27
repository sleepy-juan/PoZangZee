import React from 'react';
<<<<<<< HEAD
import '../components/readmail/readmail.css';
import NavBar from '../components/NavBar';
import Just from '../components/readmail/just';
function App() {
=======
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from '../components/NavBar';
import MailList from '../components/MailList';
import WriteMail from '../components/WriteMail';

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

function PermanentDrawerLeft(props) {
  const { classes } = props;

>>>>>>> d7296d855d0bb20f1e23aeab3bd4709ba1197231
  return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
<<<<<<< HEAD
        <Just/>
    </div>
=======
        <main className={classes.content}>
          <MailList />
        </main>
        <WriteMail />
      </div>
>>>>>>> d7296d855d0bb20f1e23aeab3bd4709ba1197231
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);
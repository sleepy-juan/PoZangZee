import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import NavBarList from './NavBarList';
import NavBarFloating from './NavBarFloating';

import logo from "../logo.png";

const styles = theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      borderBottom: "15px solid #FA7268"
    },
    toolbar: theme.mixins.toolbar,
  });

var drawerWidth = 300;

function NavBar(props) {
    const { classes } = props;

    return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <NavBarFloating />
        <NavBarList onSelect={props.onSelect} />

        <img src={logo} alt="logo" style={{width: "60%", position: "absolute", bottom: 0, marginLeft: "-30%", left: "50%"}}></img>
      </Drawer>
    )
}

export default withStyles(styles)(NavBar);
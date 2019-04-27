import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'absolute',
    right: 15,
    top: 0,
    zIndex: 2,
    borderRadius: 7,
    width: 180,
    textAlign:"right",
    justifyContent:"flex-end",
  },
  tar:{
      color:'red',
  },
  
  right:{
        position: 'absolute',
        right:0,
        border:"1px solid dodgerblue",
      float:'right',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class MenuListComposition extends React.Component {
  state = {
    open: false,
    content: "To be Replied"
  };

  changeContent = newContent =>{
    this.setState({
        content: newContent
    });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  

  holyshit1 = event => {
    this.setState({content: "To be replied"});
    this.setState({ open: false });
    if (this.anchorEl.contains(event.target)) {
        return;
      }
  
  };
  holyshit2 = event => {
    this.setState({content: "To be kept"});
    this.setState({ open: false });
    if (this.anchorEl.contains(event.target)) {
        return;
      }
  
  };
  holyshit3 = event => {
    this.setState({content: "Hall of Shame"});
    this.setState({ open: false });
    if (this.anchorEl.contains(event.target)) {
        return;
      }
  
  };
  
  

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
            className="root"
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            
            <span className="tar"> {this.state.content}</span>
            <Icon className="right" size="large"> more_vert </Icon>
            
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.holyshit1}>To be replied</MenuItem>
                      <MenuItem onClick={this.holyshit2}>To be kept</MenuItem>
                      <MenuItem onClick={this.holyshit3}>Hall of Shame</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    borderLeft: "8px solid transparent"
  },
  unnested: {
    borderLeft: "8px solid transparent"
  },
  selected: {
      borderLeft: "8px solid #FA7268",
  },
});

class NestedList extends React.Component {
  state = {
    open: true,
    selected: "Inbox",
  };

  handleClick = (what) => {
      if(what === "Status"){
          this.setState(state => ({ open: !state.open }));
      }
      else {
          this.setState({
              selected: what,
          })
      }
  };

  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"
        className={classes.root}
      >
        <ListItem button className={classes.unnested} onClick={() => this.handleClick("Inbox")} selected={this.state.selected === "Inbox"} classes={{ selected: classes.selected }}>
          <ListItemText inset primary="Inbox" />
        </ListItem>
        <ListItem button className={classes.unnested} onClick={() => this.handleClick("Sent")} selected={this.state.selected === "Sent"} classes={{ selected: classes.selected }}>
          <ListItemText inset primary="Sent" />
        </ListItem>
        <ListItem button className={classes.unnested} onClick={() => this.handleClick("Formats")} selected={this.state.selected === "Formats"} classes={{ selected: classes.selected }}>
          <ListItemText inset primary="Formats" />
        </ListItem>
        <ListItem button className={classes.unnested} onClick={() => this.handleClick("Status")} selected={this.state.selected === "Status"} classes={{ selected: classes.selected }}>
          <ListItemText inset primary="Status" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => this.handleClick("To be replied")} selected={this.state.selected === "To be replied"} classes={{ selected: classes.selected }}> 
              <ListItemText inset primary="To be replied" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => this.handleClick("To be kept")} selected={this.state.selected === "To be kept"} classes={{ selected: classes.selected }}>
              <ListItemText inset primary="To be kept" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button className={classes.unnested} onClick={() => this.handleClick("Trash")} selected={this.state.selected === "Trash"} classes={{ selected: classes.selected }}>
          <ListItemText inset primary="Trash" />
        </ListItem>
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    this.setState({
      selected: what,
    })

    if(this.props.onSelect){
      this.props.onSelect(what);
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
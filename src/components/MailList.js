import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import MailListSwitch from './MailListSwitch';
import { Divider } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
      maxWidth: "300px",
  },
});

var mails = [
    {
        from: "Juan Lee",
        subject: "Who are you?",
        sent: "4/28",
        replayBy: "Reply by 5/1",
    },
    {
        from: "Hyunchang Oh",
        subject: "This is better",
        sent: "4/28",
        replayBy: "Reply by 5/12",
    },
    {
        from: "Hyunchang Oh",
        subject: "Hi, DP4 score is announced",
        sent: "4/27",
        replayBy: "Reply by 5/11",
    },
    {
        from: "Juan Lee",
        subject: "Hi, Juana",
        sent: "4/27",
        replayBy: "Not specified",
    },
    {
        from: "Changhyeon Park",
        subject: "I am pch from Korea",
        sent: "4/25",
        replayBy: "Not specified",
    },
    {
        from: "Jeongeon Park",
        subject: "I hate HCI",
        sent: "4/22",
        replayBy: "Reply by 4/27",
    },
    {
        from: "Hyunchang Oh",
        subject: "About my roommate Changhyeon",
        sent: "4/22",
        replayBy: "Reply by 4/23",
    },
    {
        from: "Juho Kim",
        subject: "You don't have to make Hi-fi",
        sent: "4/21",
        replayBy: "Not specified",
    },
    {
        from: "Eunyoung Ko",
        subject: "PR3 is announced",
        sent: "4/21",
        replayBy: "Reply by 4/22",
    },
    {
        from: "Hyunchang Oh",
        subject: "About my roommate Changhyeon",
        sent: "4/21",
        replayBy: "Reply by 4/22",
    },
    {
        from: "Juan Lee",
        subject: "Who are you?",
        sent: "4/28",
        replayBy: "Reply by 5/1",
    },
    {
        from: "Hyunchang Oh",
        subject: "This is better",
        sent: "4/28",
        replayBy: "Reply by 5/12",
    },
    {
        from: "Hyunchang Oh",
        subject: "Hi, DP4 score is announced",
        sent: "4/27",
        replayBy: "Reply by 5/11",
    },
    {
        from: "Juan Lee",
        subject: "Hi, Juana",
        sent: "4/27",
        replayBy: "Not specified",
    },
    {
        from: "Changhyeon Park",
        subject: "I am pch from Korea",
        sent: "4/25",
        replayBy: "Not specified",
    },
    {
        from: "Jeongeon Park",
        subject: "I hate HCI",
        sent: "4/22",
        replayBy: "Reply by 4/27",
    },
    {
        from: "Hyunchang Oh",
        subject: "About my roommate Changhyeon",
        sent: "4/22",
        replayBy: "Reply by 4/23",
    },
    {
        from: "Juho Kim",
        subject: "You don't have to make Hi-fi",
        sent: "4/21",
        replayBy: "Not specified",
    },
    {
        from: "Eunyoung Ko",
        subject: "PR3 is announced",
        sent: "4/21",
        replayBy: "Reply by 4/22",
    },
    {
        from: "Hyunchang Oh",
        subject: "About my roommate Changhyeon",
        sent: "4/21",
        replayBy: "Reply by 4/22",
    },
]

class CheckboxList extends React.Component {
  state = {
    checked: [],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
      <ListItem key={-1}>
        <MailListSwitch />
      </ListItem>
      <Divider />
        {mails.map((mail, index) => (
        <div>
          <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(index)}>
            <Checkbox
              checked={this.state.checked.indexOf(index) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText className={classes.text} primary={mail.from} />
            <ListItemText className={classes.text} primary={mail.subject} />
            <ListItemText className={classes.text} primary={mail.sent} />
            <ListItemText className={classes.text} primary={mail.replayBy} />
          </ListItem>
          <Divider />
        </div>
        ))}
      </List>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
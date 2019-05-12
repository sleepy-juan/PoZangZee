import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import MailListSwitch from './MailListSwitch';
import { Divider } from '@material-ui/core';
import { getMails, getSentMails, getTrashMails } from '../utils/Database';
import queryString from 'query-string';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
      maxWidth: "300px",
  },
});

class CheckboxList extends React.Component {
  state = {
    checked: [],
    mails: [],
  };

  componentDidMount(){
    const query = queryString.parse(window.location.search);
    var user = query.username;
    getMails(user, (mails)=>{this.setState({mails})});
  }

  componentWillReceiveProps(props){
    var selected = props.selected;
    const query = queryString.parse(window.location.search);
    var user = query.username;

    if(selected === "Inbox"){
      getMails(user, (mails)=>{this.setState({mails})});
    }
    else if(selected === "Sent"){
      getSentMails(user, mails => this.setState({mails}));
    }
	else if (selected === "Formats") {
		//add format list (add function in utils/Database.js)
		this.setState({mails: ["a", "b"]})
	}
    else if(selected === 'Trash'){
      getTrashMails(user, mails => this.setState({mails}));
    }
    else {
      this.setState({mails: [{from: "format title", content: "format content"}]})
    }
  }

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

  readMail = index => () => {
    if(this.props.onRead){
      this.props.onRead(this.state.mails[index]);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
      <ListItem key={-1}>
        <MailListSwitch />
      </ListItem>
      <Divider />
        {this.state.mails.map((mail, index) => (
        <div key={index}>
          <ListItem key={index} role={undefined} dense button onClick={this.readMail(index)} >
            <Checkbox
              checked={this.state.checked.indexOf(index) !== -1}
              tabIndex={-1}
              disableRipple
              onClick={this.handleToggle(index)}
            />
            <ListItemText className={classes.text} primary={mail.from} />
            <ListItemText className={classes.text} primary={mail.subject} />
            <ListItemText className={classes.text} primary={mail.sent} />
            <ListItemText className={classes.text} primary={mail.replyBy} />
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
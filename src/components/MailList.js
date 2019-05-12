import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider, ListItemSecondaryAction, Button, Icon } from '@material-ui/core';
import queryString from 'query-string';
import firebase from 'firebase';
import WriteMail from './WriteMail';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
      maxWidth: "300px",
      font: "bold"
  },
  unreplied: {
    backgroundColor: "#FCC8C2A0"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class CheckboxList extends React.Component {
  state = {
    checked: [],
    mails: [],
    compose: false,
  };

  _sortCategoryMail(mails){
    mails = mails.map(mail => ({
      ...mail,
      sent: (new Date(mail.sent)).getTime()
    }));
    mails.sort((a,b) => b.sent - a.sent);
    mails = mails.map(mail => ({
      ...mail,
      sent: (new Date(mail.sent)).toLocaleString()
    }));

    return mails;
  }

  _sortMails(mails){
    var read = mails.filter(mail => mail.read);
    var unread = mails.filter(mail => !mail.read);
    var read_and_replied = read.filter(mail => mail.replied);
    var read_and_unreplied = read.filter(mail => !mail.replied);
    var unread_and_replied = unread.filter(mail => mail.replied);
    var unread_and_unreplied = unread.filter(mail => !mail.replied);

    unread_and_unreplied = this._sortCategoryMail(unread_and_unreplied);
    read_and_unreplied = this._sortCategoryMail(read_and_unreplied);
    unread_and_replied = this._sortCategoryMail(unread_and_replied);
    read_and_replied = this._sortCategoryMail(read_and_replied);

    var result = [];
    result = result.concat(unread_and_unreplied);
    result = result.concat(read_and_unreplied);
    result = result.concat(unread_and_replied);
    result = result.concat(read_and_replied);
    
    return result;
  }

  componentDidMount(){
    const query = queryString.parse(window.location.search);
    var user = query.username;

    firebase.database().ref(`/${user}/inbox`).once('value').then(snapshot => {
      if(snapshot.val() === null) return;

      var keys = Object.keys(snapshot.val());
      var mails = keys.map(key => snapshot.val()[key]);
      this.setState({
        mails
      })
    });
  }

  componentWillReceiveProps(props){
    var selected = props.selected;
    const query = queryString.parse(window.location.search);
    var user = query.username;

    if(selected === "Inbox"){
      firebase.database().ref(`/${user}/inbox`).once('value').then(snapshot => {
        if(snapshot.val() === null) return;
  
        var keys = Object.keys(snapshot.val());
        var mails = keys.map(key => snapshot.val()[key]);
        this.setState({
          mails
        })
      });
    }
    else if(selected === "Sent"){
      firebase.database().ref(`/${user}/sent`).once('value').then(snapshot => {
        if(snapshot.val() === null) return;
  
        var keys = Object.keys(snapshot.val());
        var mails = keys.map(key => snapshot.val()[key]);
        this.setState({
          mails
        })
      });
    }
	else if (selected === "Formats") {
		//add format list (add function in utils/Database.js)
		this.setState({mails: ["a", "b"]})
	}
    else if(selected === 'Trash'){
      firebase.database().ref(`/${user}/trash`).once('value').then(snapshot => {
        if(snapshot.val() === null) return;
  
        var keys = Object.keys(snapshot.val());
        var mails = keys.map(key => snapshot.val()[key]);
        this.setState({
          mails
        })
      });
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

  readMail = mail => () => {
    if(this.props.onRead){
      this.props.onRead(mail);

      const query = queryString.parse(window.location.search);
      var user = query.username;
      firebase.database().ref(`/${user}/inbox/${mail.id}`).update({
        read: new Date().toLocaleString()
      })
    }
  }

  onIgnored = mail => () => {
    const query = queryString.parse(window.location.search);
    var user = query.username;
    var replied = new Date().toLocaleString();

    firebase.database().ref(`/${user}/inbox/${mail.id}`).update({
      replied
    })

    var mails = this.state.mails;
    mails.forEach(fmail => {
      if(fmail.id === mail.id){
        fmail.replied = replied;
      }
    })
    this.setState({
      mails
    })
  }

  onDirectReplied = mail => () => {
    this.setState({
      compose: true,
      replyInfo: mail,
    })
  }

  onDirectReplyClosed = mail => () => {
    var mails = this.state.mails;
    mails.forEach(fmail => {
      if(fmail.id === mail.id){
        fmail.replied = true;
      }
    })

    this.setState({
      compose: false,
      mails
    })
  }

  render() {
    const { classes } = this.props;
    var { mails } = this.state;
    mails = this._sortMails(mails);

    return (
      <div>
        <List className={classes.root}>
          {mails.map((mail, index) => (
          <div key={index}>
            <ListItem className={mail.replied ? undefined : classes.unreplied} key={index} role={undefined} dense button onClick={this.readMail(mail)} >
              <Checkbox
                checked={this.state.checked.indexOf(index) !== -1}
                tabIndex={-1}
                disableRipple
                onClick={this.handleToggle(index)}
              />
              <ListItemText className={classes.text} >
                {mail.read ? mail.from : <strong>{mail.from}</strong>}
              </ListItemText>
              <ListItemText className={classes.text} >
              {mail.read ? mail.subject : <strong>{mail.subject}</strong>}
              </ListItemText>
              <ListItemText className={classes.text} >
              {mail.read ? mail.sent : <strong>{mail.sent}</strong>}
              </ListItemText>
              <ListItemSecondaryAction>
                <Button color="secondary" className={classes.button} onClick={this.onDirectReplied(mail)}>
                  Reply
                  <Icon className={classes.rightIcon}>send</Icon>
                </Button>
                <Button color="secondary" className={classes.button} onClick={this.onIgnored(mail)}>
                  Ignore
                  <Icon className={classes.rightIcon}>check</Icon>
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
          ))}
        </List>
        {this.state.compose ? <WriteMail onClose={this.onDirectReplyClosed(this.state.replyInfo).bind(this)} replyInfo = {this.state.replyInfo} /> : null}
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
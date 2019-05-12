import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider } from '@material-ui/core';
import queryString from 'query-string';
import firebase from 'firebase';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
      maxWidth: "300px",
      font: "bold"
  },
});

class CheckboxList extends React.Component {
  state = {
    checked: [],
    mails: [],
  };

  _sortMails(mails){
    mails = mails.map(mail => ({
      ...mail,
      sent: (new Date(mail.sent)).getTime()
    }));

    console.log(mails);
    window.mails = mails;

    mails.sort((a,b) => b.sent - a.sent);
    mails = mails.map(mail => ({
      ...mail,
      sent: (new Date(mail.sent)).toLocaleString()
    }));

    return mails;
  }

  componentDidMount(){
    const query = queryString.parse(window.location.search);
    var user = query.username;

    firebase.database().ref(`/${user}/inbox`).once('value').then(snapshot => {
      if(snapshot.val() === null) return;

      var keys = Object.keys(snapshot.val());
      var mails = keys.map(key => snapshot.val()[key]);
      this.setState({
        mails: this._sortMails(mails)
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
          mails: this._sortMails(mails)
        })
      });
    }
    else if(selected === "Sent"){
      firebase.database().ref(`/${user}/sent`).once('value').then(snapshot => {
        if(snapshot.val() === null) return;
  
        var keys = Object.keys(snapshot.val());
        var mails = keys.map(key => snapshot.val()[key]);
        this.setState({
          mails: this._sortMails(mails)
        })
      });
    }
    else if(selected === 'Trash'){
      firebase.database().ref(`/${user}/trash`).once('value').then(snapshot => {
        if(snapshot.val() === null) return;
  
        var keys = Object.keys(snapshot.val());
        var mails = keys.map(key => snapshot.val()[key]);
        this.setState({
          mails: this._sortMails(mails)
        })
      });
    }
    else {
      this.setState({mails: []})
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
        {this.state.mails.map((mail, index) => (
        <div key={index}>
          <ListItem className={classes.item} key={index} role={undefined} dense button onClick={this.readMail(index)} >
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
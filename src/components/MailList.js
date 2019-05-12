import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
      font: "bold",
      padding: "7px 14px 7px 14px"
  },
  replied: {
    backgroundColor: "#FFFFFF"
  },
  unreplied: {
    backgroundColor: "#FA726810"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  focus:{
    backgroundColor: "#FFC2BB"
  }
});

class CheckboxList extends React.Component {
  state = {
    mails: [],
    compose: false,
    index:0,
    alwaystrue: true,
  };

  _sortCategoryMail(mails){
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
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyup);
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
        console.log(mails); window.mails = mails;
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

  readMail = mail => () => {
    console.log("readMail Triggered")
    if(this.props.onRead){
      this.props.onRead(mail);

      const query = queryString.parse(window.location.search);
      var user = query.username;
      firebase.database().ref(`/${user}/inbox/${mail.id}`).update({
        read: new Date().getTime()
      })
    }
  }

//This function Makes you Move up and down the focus by pressing up and down arrow key (Made by Hyunchang)
  handleKeydown = e => {
    console.log(e.keyCode);
    if(!this.state.compose && this.state.mails.length>0 && !window.compose){
        //when up
      if(e.keyCode===40){
        if(this.state.index+1 !== this.state.mails.length){
          this.setState({
            index : this.state.index +1,
          })
        }
        else{
          this.setState({
            index : 0,
          })
        }
      };

      //when down
      if(e.keyCode===38){
        
        if(this.state.index-1 === -1){
          this.setState({
            index : this.state.mails.length-1,
          })
        }
        else{
          this.setState({
            index : this.state.index -1,
          })
        }
      }

      //when pressed enter
      if(e.keyCode==13){
        this.readMail(this.state.mails[this.state.index])();
      }

      if(e.keyCode===73||e.keyCode===75){
        var mails = this._sortMails(this.state.mails);
        var mail = mails[this.state.index];

        if(mail.replied){
          this.onKept(mail)();
        }
        else{
          this.onIgnored(mail)();
        }
      }
    }
  }

  handleKeyup=e=>{
    if(!this.state.compose && !window.compose){
      if(e.keyCode==82){
        this.onDirectReplied(this.state.mails[this.state.index])();
      }

      if(e.keyCode==8 && this.state.mails.length>0){
        var mails = this._sortMails(this.state.mails);
        var mail = mails[this.state.index];

        this.onDeleted(mail)();
        
      }
    }
  }


  onIgnored = mail => () => {
    const query = queryString.parse(window.location.search);
    var user = query.username;
    var replied = new Date().getTime();

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

  onKept = mail => () => {
    const query = queryString.parse(window.location.search);
    var user = query.username;
    firebase.database().ref(`/${user}/inbox/${mail.id}`).update({
      replied: null
    })

    var mails = this.state.mails;
    mails.forEach(fmail => {
      if(fmail.id === mail.id){
        fmail.replied = null;
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

  onDeleted = mail => () => {
    const query = queryString.parse(window.location.search);
    var user = query.username;
    const {from, to, id} = mail;
    if(from === user){
      firebase.database().ref(`/${user}/sent/${id}`).once('value').then(snapshot => {
        if(snapshot.val() === null) return 0;

        firebase.database().ref(`/${user}/sent/${id}`).remove().then(() => {
          firebase.database().ref(`/${user}/trash/${id}`).set(snapshot.val());
        })
      })
    }
    else if(to === user){
      firebase.database().ref(`/${user}/inbox/${id}`).once('value').then(snapshot => {
        if(snapshot.val() === null) return 0;

        firebase.database().ref(`/${user}/inbox/${id}`).remove().then(() => {
          firebase.database().ref(`/${user}/trash/${id}`).set(snapshot.val());
        })
      })
    }

    this.setState({
      mails: this.state.mails.filter(mail => mail.id !== id)
    })
  }

  render() {
    const { classes } = this.props;
    var { mails } = this.state;
    mails = this._sortMails(mails);

    console.log(mails);
    
      //Look Here
    //mails[this.state.index].classes.focus;

    if(this.props.selected === "Inbox"){
      return (
        <div>
          <List className={classes.root}>
            {mails.map((mail, index) => (
            <div key={index}>
              <ListItem className={mail.replied ? (index===this.state.index ? classes.focus : classes.replied) : (index===this.state.index ? classes.focus : classes.unreplied) } key={index} role={undefined} dense button onClick={this.readMail(mail)} >
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
                  {
                    mail.replied ?
                    <Button color="primary" className={classes.button} onClick={this.onKept(mail)} >
                    Keep
                    <Icon className={classes.rightIcon}>check</Icon>
                  </Button> :
                    <Button color="primary" className={classes.button} onClick={this.onIgnored(mail)} >
                    Ignore
                    <Icon className={classes.rightIcon}>clear</Icon>
                  </Button>
                  }
                  <Button color="secondary" className={classes.button} onClick={this.onDirectReplied(mail)}>
                    Reply
                    <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                  <Button className={classes.button} onClick={this.onDeleted(mail)}>
                    Delete
                    <Icon className={classes.rightIcon}>delete</Icon>
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
            ))}
          </List>
          {this.state.compose ? <WriteMail onJustClose={this.onDirectReplyClosed(this.state.replyInfo).bind(this)} onClose={this.onDirectReplyClosed(this.state.replyInfo).bind(this)} replyInfo = {this.state.replyInfo} /> : null}
        </div>
      );
    }

    return (
      <div>
        <List className={classes.root}>
          {mails.map((mail, index) => (
          <div key={index}>
            <ListItem className={mail.replied ? classes.replied : classes.undefined } key={index} role={undefined} dense button onClick={this.readMail(mail)} >
              <ListItemText className={classes.text} >
                {mail.read ? mail.from : <strong>{mail.from}</strong>}
              </ListItemText>
              <ListItemText className={classes.text} >
              {mail.read ? mail.subject : <strong>{mail.subject}</strong>}
              </ListItemText>
              <ListItemText className={classes.text} >
              {mail.read ? mail.sent : <strong>{mail.sent}</strong>}
              </ListItemText>
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
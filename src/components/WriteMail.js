﻿import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Clear';
import queryString from 'query-string';
import firebase from 'firebase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NumberFormat from 'react-number-format';
import FormattedInput from './FormattedInput';


const styles = theme => ({
  card: {
		maxWidth: 600,
		minWidth: 600,
		position: "fixed",
		bottom: 0,
		right: 30,
		border: "2px solid #FA7268"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
	},
	margin: {
		color: "white"
	}
});

const theme = createMuiTheme({
  palette: {
    primary: {
		main: '#FA7268'
	},
  },
  typography: {
    useNextVariants: true,
  },
});


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
	  //format="(###)##-##"
      //prefix="$"
	  //prefix="Dear All, I will hand out your HW 2 sheets in Monday's class. If you miss the class or have some questions, you can visit one of following two sessions. 1. Mon, May 13, 8:00PM ~ 9:30PM, N1 403 2. Thu, May 16, 4:00PM ~ 5:30PM, E3-1 3420 In case you cannot make it for some special reason, please contact me via email by the middle of next week. Thanks, Hangyeol Yu";

    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};


class WriteMail extends React.Component {
	constructor(props){
		super(props);

		this.content = '';
	}

  state = {
	expanded: false,
	popup: false
   }

  onSendClicked = () => {
		if(this.props.onClose){
			this.props.onClose();
			this.sendMail();
		}
  }



  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
	};
	
	sendMail = () => {
		const query = queryString.parse(window.location.search);
		var from = query.username;
		var to = this.to || this.props.replyInfo.from;
		var subject = this.subject || "re: " + this.props.replyInfo.subject;
		var content = this.content;

		var sent = firebase.database().ref(`/${from}/sent`).push();
		sent.set({from, to, subject, content, id: sent.key, sent: new Date().getTime()});

		var inbox = firebase.database().ref(`/${to}/inbox`).push();
		inbox.set({from, to, subject, content, id: inbox.key, sent: new Date().getTime()});

		if(this.props.replyInfo){
			firebase.database().ref(`/${from}/inbox/${this.props.replyInfo.id}`).update({
				replied: new Date().getTime()
			})
		}
	}


  state = {
    anchorEl: null,
		numberformat: "This is a default.",
		formats: []
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
		this.setState({ anchorEl: null });
  };

	componentDidMount(){
		window.keymap={};
		document.addEventListener('keyup', this.handleKeyup);
		document.addEventListener('keydown', this.handleKeydown);

		const query = queryString.parse(window.location.search);
		var user = query.username;
		firebase.database().ref(`/${user}/format`).once('value').then(snapshot => {
			if(snapshot.val() === null){
				this.setState({
					formats: []
				})
				return;
			}

			var keys = Object.keys(snapshot.val());
      var formats = keys.map(key => snapshot.val()[key]);
		
			this.setState({
				formats
			})
		})
	}


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

	
	handleKeyup=e=>{
		if(e.keyCode===27){
			this.props.onJustClose();
		}
	}
	
	handleKeydown=e=>{

		window.keymap[e.keyCode] = true;
		if(window.keymap[13] && window.keymap[17]){
			this.onSendClicked();
			window.keymap={};
		}
		
	}

	onFormatSelected = format => () => {
		console.log('selected', format)
		this.setState({
			selected_format: format
		})
		this.handleClose();
	}


  render() {
    const { classes } = this.props;
		const { anchorEl } = this.state;

		console.log(this.state.selected_format)

    return (
			<div>
				<Card className={classes.card}>
	    
        <CardHeader 
		  style={{ marginLeft: 8 }}
          title={this.props.replyInfo ? "Reply" : "New Email"}
		  action={
			<div style={{ marginTop: 13, marginRight: 18 }}>
				<MuiThemeProvider theme={theme}>
					<Button variant="contained" color="primary" className={classes.margin} style={{ marginRight: 15 }} aria-owns={anchorEl ? 'simple-menu' : undefined}
					  aria-haspopup="true"
					  onClick={this.handleClick}>
					  Get Format
					</Button>
					<Menu
					  id="simple-menu"
					  anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={this.handleClose}
					>
					{
						this.state.formats.map((format, index) => {
							return (
								<MenuItem key={index} onClick={this.onFormatSelected(format)}>{format.name}</MenuItem>
							)
						})
					}
					</Menu>
				</MuiThemeProvider>
				<MuiThemeProvider theme={theme}>
					<Fab size="small" color="primary" aria-label="Add" className={classes.margin}
						onClick={() => {
							if(this.props.onJustClose){
								this.props.onJustClose();
							}
						}}
					>
					  <AddIcon />
					</Fab>
				</MuiThemeProvider>
				
			</div>
		  }
        />
        
        <CardContent >
		  <Typography style={{ marginLeft: 8 }}>
			<TextField
			  required
			  id="to"
			  label="To"
			  className={classes.textField}
				margin="dense"
				fullWidth
				onChange={e => { 
					this.to = e.target.value; 
					e.stopPropagation();
					e.nativeEvent.stopImmediatePropagation();
				}}
				defaultValue={this.props.replyInfo ? this.props.replyInfo.from : null}
				autoFocus={!this.props.replyInfo}
			/>
		  </Typography>
		  <Typography style={{ marginLeft: 8 }}>
			<TextField
			  required
			  id="subject"
			  label="Subject"
			  className={classes.textField}
				margin="dense"
				fullWidth
				onChange={event => { this.subject = event.target.value; }}
				defaultValue={this.props.replyInfo ? "re: " + this.props.replyInfo.subject : null}
			/>
			
		  </Typography>
		  <Typography>
			<div class="form-control">
			  <label for="my-input"></label>	
				{
					this.state.selected_format ? 
					<FormattedInput format = {this.state.selected_format} /> : 
					<TextField

				  ref="context"
				  label=""
				  //value={numberformat}
				  style={{ marginTop: 40, height: 160}}
				  placeholder="Enter here"
				  fullWidth
				  multiline={true}
				  rows={6}
				  marginTop="normal"
				  variant="outlined"
				  InputLabelProps={{
					shrink: true,
					}}

					//onChange={this.handleChange('numberformat')}

					onChange={event => { 
						this.content = event.target.value;
						if(this.props.deliverContent){
							this.props.deliverContent(this.content);
						}
					}}

					autoFocus={this.props.replyInfo}
					//InputProps={{
					//	inputComponent: NumberFormatCustom,
					//}}
				/>
				}		
				{/*<span id="my-helper-text">We'll never share your email.</span>*/}
			</div>

			{/*
			<div class="form-control">  
			  <TextField 
				id="my-input" 
				aria-describedby="my-helper-text" 
				value={numberformat}
				onChange={this.handleChange('numberformat')}
				InputProps={{
					inputComponent: NumberFormatCustom,


			  />
			</div>*/}
			
		  </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing style={{justifyContent: 'center'}}>
		  <MuiThemeProvider theme={theme}>
			<Button variant="contained" color="primary" className={classes.margin} style={{ marginBottom: 20  }} 
				onClick={this.onSendClicked}>
				SEND
			</Button>
		  </MuiThemeProvider>
          
        </CardActions>
        
      </Card>
			</div>
      
    );
  }
}

WriteMail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WriteMail);
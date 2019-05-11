import React from 'react';
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
import { sendMail } from '../utils/Database';
import queryString from 'query-string';
import MailSentPopup from './MailSentPopup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

class ReadMail extends React.Component {
  state = {
	expanded: false,
	popup: false
   }

  onSendClicked = () => {
    this.setState({popup: true});
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
		sendMail(from, this.to || this.props.replyInfo.from, this.subject || "re: " + this.props.replyInfo.subject, this.content);

		if(this.props.onClose){
			this.props.onClose();
		}
	}


  state = {
    anchorEl: null,
	value: "DEFAULT FOR TESTING",
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (ev) => {
    this.setState({ anchorEl: null });
	//get info from db and fill onto the email context
	this.setState({value: ev.nativeEvent.target.outerText})
  };

  render() {
    const { classes } = this.props;
	const { anchorEl } = this.state;

    return (
      <Card className={classes.card}>
		{this.state.popup ? <MailSentPopup ></MailSentPopup> : null}
	    
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
					  <MenuItem onClick={this.handleClose}>Format1</MenuItem>
					  <MenuItem onClick={this.handleClose}>Format2</MenuItem>
					  <MenuItem onClick={this.handleClose}>format3</MenuItem>
					</Menu>
				</MuiThemeProvider>
				<MuiThemeProvider theme={theme}>
					<Fab size="small" color="primary" aria-label="Add" className={classes.margin}
						onClick={() => {
							if(this.props.onClose){
								this.props.onClose();
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
				onChange={event => { this.to = event.target.value; }}
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
			<TextField
			  ref="context"
			  label=""
			  value={this.state.value}
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
				onChange={event => { this.content = event.target.value; }}
				autoFocus={this.props.replyInfo}
			/>
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
    );
  }
}

ReadMail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReadMail);
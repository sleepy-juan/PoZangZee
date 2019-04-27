import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const styles = theme => ({
  card: {
    maxWidth: 600,
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
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader 
		  style={{ marginLeft: 8 }}
          title="New Email"
		  action={
			<MuiThemeProvider theme={theme}>
				<Button variant="contained" color="primary" className={classes.margin} style={{ marginTop: 13, marginRight: 18 }}>
				  Get Format
				</Button>
			</MuiThemeProvider>
		  }
          //subheader="New Email"
        />
        
        <CardContent >
		  <Typography style={{ marginLeft: 8 }}>
			<TextField
			  id="to"
			  label="To"
			  className={classes.textField}
			  type="password"
			  autoComplete="current-password"
			  margin="dense"
			/>
		  </Typography>
		  <Typography style={{ marginLeft: 8 }}>
			<TextField
			  id="subject"
			  label="Subject"
			  className={classes.textField}
			  type="password"
			  autoComplete="current-password"
			  margin="dense"
			/>
			
		  </Typography>
		  <Typography>
			<TextField
			  id="outlined-full-width"
			  label=""
			  style={{ marginTop: 40, height: 160}}
			  placeholder="Enter here"
			  
			  fullWidth
			  multiline={true}
			  rows={6}
			  //rowsMax={4}
			  marginTop="normal"
			  variant="outlined"
			  InputLabelProps={{
				shrink: true,
			  }}
			/>
		  </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing style={{justifyContent: 'center'}}>
		  <MuiThemeProvider theme={theme}  >
				<Button variant="contained" color="primary" className={classes.margin} style={{ marginBottom: 20  }}>
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
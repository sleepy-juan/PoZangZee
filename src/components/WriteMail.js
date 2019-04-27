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
			<div style={{ marginTop: 13, marginRight: 18 }}>
				<MuiThemeProvider theme={theme}>
					<Button variant="contained" color="primary" className={classes.margin} style={{ marginRight: 15 }}>
					  Get Format
					</Button>
				</MuiThemeProvider>
				<MuiThemeProvider theme={theme}>
					<Fab size="small" color="primary" aria-label="Add" className={classes.margin}>
					  <AddIcon />
					</Fab>
				</MuiThemeProvider>
				
			</div>
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
				fullWidth
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
				fullWidth
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
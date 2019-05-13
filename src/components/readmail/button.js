import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  button: {
    position: 'aboslute',
    left:0,
  },
  button2: {
    right: 30,
    position: 'absolute',
  },
  input: {
    display: 'none',
  },
});



function IconButtons(props) {
  const { classes } = props;
  

  return (
    <div>
      <IconButton className={classes.button} onClick={props.onBack} aria-label="Delete">
      <Icon size="large" >keyboard_arrow_left</Icon>
      </IconButton>

      <IconButton className={classes.button2} onClick={props.onDelete} aria-label="Delete" >
        <DeleteIcon />
      </IconButton>

     
      
    </div>
  );
}


IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtons);
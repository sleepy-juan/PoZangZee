import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const styles = theme => ({
  button: {
    position: 'aboslute',
    left:0,
  },
  button2: {
    right:10,
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
      <IconButton className={classes.button}  aria-label="Delete">
      <Icon size="large" >keyboard_arrow_left</Icon>
      </IconButton>

      <IconButton className={classes.button2} aria-label="Delete" >
        <DeleteIcon />
      </IconButton>

     
      
    </div>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtons);
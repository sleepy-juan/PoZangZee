import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FA7268" }, // Purple and green play nicely together.
  },
});

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 8,
        color: "white",
    },
});

function FabButton(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
        <Fab size="large" variant="extended" aria-label="Add" color="primary" className={classes.fab}>
            Compose
        </Fab>
    </MuiThemeProvider>
  );
}

FabButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FabButton);
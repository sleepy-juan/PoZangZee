import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import shortcuts from './shortcuts.jpeg';
import { Button } from '@material-ui/core';

class ImageDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
          <Button onClick={this.handleClickOpen} style={{position:"fixed", left: "320px", top: "5px", fontFamily: "arial", color: "white"}}>Shortcuts</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth="100%"
        >
          <img src={shortcuts} alt=""/>
        </Dialog>
      </div>
    );
  }
}

export default ImageDialog;
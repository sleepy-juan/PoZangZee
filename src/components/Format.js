import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import TextInput from './TextInput';
import { isUndefined } from 'util';

import queryString from 'query-string';
import firebase from 'firebase';


const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);




class CustomizedDialogDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      hightext: [],
      num: 0,
      text: ""

    }
    
  }

  
  highlight = (event) => {
    

    var sel = window.getSelection();
    
    var startIndex, endIndex;
    var previous = 0;
    
    let current = sel.anchorNode;
    let current_end = sel.focusNode;
    
    /* get highlited index of the text */
    if (this.state.hightext.length === 0) {
      startIndex = sel.anchorOffset;
      endIndex = sel.focusOffset;
    } else {
      /* get startIndex */
      //let first = current.parentNode.firstChild;

      let first = document.getElementById('content').firstChild;

     
      while (first !== current && first.firstChild !== current) {
        
      
        if (isUndefined(first.length)) {
        
          
          previous += first.firstChild.length
          
        } else {
          
          previous += first.length
        }
        first = first.nextSibling
       
      }

      startIndex = sel.anchorOffset +previous;

      /* get endIndex */ 
      first = document.getElementById('content').firstChild;
      previous = 0;
      while (first !== current_end && first.firstChild !== current_end) {
        
      
        if (isUndefined(first.length)) {
        
          
          previous += first.firstChild.length
        } else {
          
          previous += first.length
        }
        first = first.nextSibling
    
      }

      endIndex = sel.focusOffset +previous;

    }

    var temp;
    if (endIndex < startIndex) {
      temp = endIndex;
      endIndex = startIndex;
      startIndex = temp;
    } else if (endIndex === startIndex) {
      return;
    }

    
    var indexTable =this.state.hightext;

    /* insert index pair list to 'hightext' state and change html */

    var index=0;
    if (indexTable.length === 0) {
      
      indexTable.push([startIndex,endIndex])
    } else if (indexTable[indexTable.length-1][1] < startIndex) {
     
      index = indexTable.length;
      indexTable.push([startIndex,endIndex]);
    }

    else if ( indexTable[0][0] > endIndex) {
     
      indexTable.unshift([startIndex,endIndex])
      
    } else {
     

      var table_startIndex, table_endIndex;

      var j=0;
     
      while (j< indexTable.length) {
       
        if (startIndex <= indexTable[j][1]) {
          table_startIndex = j;
          break;
        }
        j++
      }
     
      index = j;
      
      if (endIndex < indexTable[j][0]) {
     
        indexTable.splice(j,0,[startIndex,endIndex]);
        

      } else {
       
        var k = indexTable.length -1;

        while (k >= j) {
          if (endIndex >= indexTable[k][0]) {
            table_endIndex = k;
            break;
          }
          k--;
        }

        if (startIndex > indexTable[table_startIndex][0]) {
          startIndex = indexTable[table_startIndex][0];
        }
        if (endIndex < indexTable[table_endIndex][1]) {
          endIndex = indexTable[table_endIndex][1];
        }

        var curIndex;
        var curstart, curend;
        var html = this.ref.innerHTML;
        for (var i= table_startIndex; i <= table_endIndex; i++) {
          curIndex = indexTable[table_startIndex];
          curstart = curIndex[0];
          curend = curIndex[1];
          
          indexTable.splice(table_startIndex,1);
        

          html = html.slice(0,curstart+ 13*table_startIndex) 
                + html.slice(curstart+ 13*table_startIndex+6,curend +13*table_startIndex+6) 
                + html.slice(curend+13*(table_startIndex+1));
         
          this.ref.innerHTML = html;

        }

        indexTable.splice(table_startIndex,0, [startIndex,endIndex])



      }

    }

    html = this.ref.innerHTML;
    html = html.slice(0, endIndex+13*index) + "</mark>" + html.slice(endIndex+13*index);
    html = html.slice(0, startIndex+13*index) + "<mark>" + html.slice(startIndex+13*index);
    this.ref.innerHTML = html;


    this.setState({
      hightext: indexTable,
      num: this.state.num + 1

    })
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };


  saveFormat = () => {
    const query = queryString.parse(window.location.search);
    var username = query.username;
    var name = this.state.text;
    var context = this.props.context;
	//var context ="";
    var index = this.state.hightext;
    
    var format = firebase.database().ref(`/${username}/format`).push();
		format.set({name, context, index, time: new Date().getTime()});

    this.setState({ open: false });
    if(this.props.resetIsformat) {
      this.props.resetIsformat();
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    });

    if(this.props.onFormatClosed){
      this.props.onFormatClosed();
    }
  }
  

  render() {
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            save format: Highlight the part you wish to change&nbsp; &nbsp; &nbsp; &nbsp; 
          </DialogTitle>
          
        <TextInput onChangeText={(text) => this.setState({text})} text = "FormatName" id="Format-name" />
          <DialogContent>
            
            <Typography gutterBottom>
              
            </Typography>
            <Typography gutterBottom>
              
            </Typography>
            <p ref={c=>this.ref = c}  id='content' onClick={this.highlight} rows='15' style={{width: "100%"}} >
              {this.props.context}
      
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveFormat} color="primary">
              Save format
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomizedDialogDemo;
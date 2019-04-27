import React from 'react';
import Switch from '@material-ui/core/Switch';

class MailListSwitch extends React.Component {
  state = {
    checked: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
        <div>
            Sort by Status
            <Switch
            checked={this.state.checked}
            onChange={this.handleChange('checked')}
            value="checked"
          />
        </div>
    );
  }
}

export default MailListSwitch;
import React from 'react';
import renderHTML from 'react-render-html';

class App extends React.Component {
    state = {
        html: "<p>Loading...</p>"
    }
    componentDidMount(){
        fetch("https://raw.githubusercontent.com/sleepy-juan/PoZangZee/master/documents/docs-en.html")
        .then(html => html.text())
        .then(html => {
            this.setState({
                html
            })
        })
    }
    render() {
      return (
        <div className='app'>
            {renderHTML(this.state.html)}
        </div>
    );
    }
  }

export default App;
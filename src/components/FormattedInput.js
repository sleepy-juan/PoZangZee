import React from 'react';

class FormattedInput extends React.Component {
    state = {
        html: "<mark>Test</mark>"
    }
    componentDidMount(){
        var html = "";
        var lastIndex = 0;
        this.props.format.index.forEach(i => {
            var s = i[0], e = i[1];
            
            html += this.props.format.context.slice(lastIndex, s);
            html += `<input placeholder=${this.props.format.context.slice(s, e)} />`;

            lastIndex = e;
        });
        
        if(this.ref){
            this.ref.innerHTML = html;
        }
    }

    render(){
        return (
            <div ref={c => this.ref = c}>
            </div>
        )
    }
}

export default FormattedInput;
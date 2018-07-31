import React, { Component } from 'react';

class LabelAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    render() {
        function toggleClass() {
            var currentState = this.state.active;
            this.props.stateByName(this.props.text,this.props.nameToState);
            this.setState({ active: !currentState });
        }
        return (
            <label
                className={this.state.active ? 'active': null}
                onMouseDown={toggleClass.bind(this)} onTouchStart={toggleClass.bind(this)}
            >
                {this.props.text}<input type="checkbox" />
            </label>
        )
    }
}
export default LabelAdd;
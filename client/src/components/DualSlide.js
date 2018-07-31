import React, { Component } from 'react';

class DualSlide extends Component {
    constructor(props) {
        super();
        this.state = {
            key: props.keyc,
            minEnabled: false,
            maxEnabled: false,
            min:50,
            minF:props.initialMin,
            max:950,
            maxF:props.initialMax
        };
    }
    componentDidUpdate( prevProps,  prevState) {

    }

    render() {
        function disableMax() {
            this.setState({
                maxEnabled: false
            });
        }
        function enableMax() {
            this.setState({
                maxEnabled: true
            });
        }
        function disableMin() {
            this.setState({
                minEnabled: false
            });
        }
        function enableMin() {
            this.setState({
                minEnabled: true
            });
        }
        function changeValuesMin(event,key) {
            if(key.state.minEnabled) {
                var mX = event.pageX;
                var rect = document.getElementById(key.props.keyc).getBoundingClientRect();

                var svgWidth = (rect.right - rect.left);
                var minEx = 24 + (950 * ((mX - rect.left) / svgWidth));
                var differenceMinMax = key.props.initialMax - key.props.initialMin;
                if(minEx < 50) {
                    minEx = 50;
                }
                else if(minEx > 900) {
                    minEx = 900;
                }
                var minF = parseInt(((minEx - 50) / 900) * differenceMinMax) + key.props.initialMin;
                if(key.state.max - 100 < minEx ) {
                    var maxSet = minEx + 100;
                    if(maxSet > 950) {
                        maxSet = 950;
                    }
                    var maxF = parseInt(((maxSet - 50) / 900) * differenceMinMax) + key.props.initialMin;
                    key.setState({
                        min:minEx,
                        max:maxSet,
                        maxF:maxF,
                        minF:minF
                    });
                }
                else {
                    key.setState({
                        min:minEx,
                        minF:minF
                    });
                }
                var minMax = [key.state.minF,key.state.maxF];
                key.props.dualName(minMax,"doors");
            }
        }
        function changeValuesMax(event,key) {
            if(key.state.maxEnabled) {
                var mX = event.pageX;
                var rect = document.getElementById(key.props.keyc).getBoundingClientRect();

                var svgWidth = (rect.right - rect.left);
                var maxEx = 24 + (950 * ((mX - rect.left) / svgWidth));
                if(maxEx < 100) {
                    maxEx = 100;
                }
                else if(maxEx > 950) {
                    maxEx = 950;
                }
                var differenceMinMax = key.props.initialMax - key.props.initialMin;
                var maxF = parseInt(((maxEx - 50) / 900) * differenceMinMax) + key.props.initialMin;
                if(key.state.min + 100 > maxEx ) {
                    var minSet = maxEx - 100;
                    if(minSet < 50) {
                        minSet = 50;
                    }
                    var minF = parseInt(((minSet - 50) / 900) * differenceMinMax) + key.props.initialMin;
                    key.setState({
                        min:minSet,
                        max:maxEx,
                        maxF:maxF,
                        minF:minF
                    });
                }
                else {
                    key.setState({
                        max:maxEx,
                        maxF:maxF
                    });
                }
                var minMax = [key.state.minF,key.state.maxF];
                key.props.dualName(minMax,"doors");
            }
        }
        return (
            <div>
                <p>{this.state.minF}</p>
                <p>{this.state.maxF}</p>
            <svg id={this.props.keyc} xmlns='http://www.w3.org/2000/svg' viewBox="0 0 1000 120" version='1.1' height='120' width='1000' className="multiRange">
                <rect fill="#91005a" y="56" width="1000" height="12" rx="12" ry="1" />
                <circle fill="#fff" stroke="#c40079" strokeWidth="6" onMouseLeave={disableMin.bind(this)} onMouseDown={enableMin.bind(this)} onMouseUp={disableMin.bind(this)} onMouseMove={(event) => changeValuesMin(event,this)} cx={this.state.min} cy="60" r="50"/>
                <circle fill="#fff" stroke="#c40079" strokeWidth="6" onMouseLeave={disableMin.bind(this)} onMouseDown={enableMax.bind(this)} onMouseUp={disableMax.bind(this)} onMouseMove={(event) => changeValuesMax(event,this)} cx={this.state.max} cy="60" r="48"/>
            </svg>
            </div>
        );
    }
}
export default DualSlide;
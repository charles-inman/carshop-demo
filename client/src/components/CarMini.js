import React, { Component } from 'react';


class CarMini extends Component {
    constructor(props) {
        super();
    }

    render() {
        var mileage = parseInt(this.props.cdata.mileage / 1000);
        var cprops = this;
        function setCarID() {
            cprops.props.setcarid(cprops.props.cdata.id);
        }
        return (
        <article id={this.props.cdata.id} onClick={setCarID} className="carMini">
            <figure>
                <img src={this.props.cdata.displayImage.medium} alt={this.props.cdata.vehicleCapDetails.capMakeName + " " +  this.props.cdata.vehicleCapDetails.presentationRange}  />
            </figure>
            <div>
                <h2>{this.props.cdata.vehicleCapDetails.capMakeName} {this.props.cdata.vehicleCapDetails.presentationRange}</h2>
                <h3>{this.props.cdata.vehicleCapDetails.capDerivativeName}</h3>
                <p className="pricing">From <span>£{this.props.cdata.monthlyPayment}</span> Monthly or <span>£{this.props.cdata.vehiclePrice.salePrice}</span></p>
                <ul>
                    <li>{mileage}k</li>
                    <li>{this.props.cdata.fuel}</li>
                    <li>{this.props.cdata.transmission}</li>
                    <li>{this.props.cdata.displayColour}</li>
                    <li>{this.props.cdata.storeName}</li>
                </ul>
            </div>
        </article>
        );
    }

}
export default CarMini;
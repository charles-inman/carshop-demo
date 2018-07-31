import React, { Component } from 'react';


class SingleCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carData: {
                "id": 254177,
                "doors": 3,
                "drivetrain": "Front wheel drive",
                "optionsCost": null,
                "year": "",
                "autotraderDescription": "",
                "attentionGrabber": "£30 road tax | AUX input",
                "motUntil": "2018-12-14T00:00:00Z",
                "mileage": "",
                "serviceHistoryPresent": true,
                "watchersCount": 5,
                "transmission": "Manual",
                "carbonEmission": "",
                "displayImage": {
                    "small": "",
                    "medium": "//images.carshop.co.uk/WF/61/WF61DWJ/WF61DWJ-used-FORD-KA-HATCHBACK-1-2-Studio-3dr-Start-Stop-Petrol-Manual-BLUE-2011-v2-HR-M-01.jpg",
                    "large": ""
                },
                "statistics": {
                    "mpg": "",
                    "luggageCapacitySeatsUp": 224,
                    "fuelCapacity": 35,
                    "width": 1658,
                    "topSpeed": 99,
                    "insuranceGroup": "",
                    "ncapStarRating": null,
                    "yearlyRoadTax": 30,
                    "enginePower": 69,
                    "length": 3623,
                    "zeroToSixtySeconds": 13.3,
                    "seats": 4,
                    "sixMonthRoadTax": null,
                    "luggageCapacitySeatsDown": 747,
                    "taxBand": ""
                },
                "pcpMonthlyPayment": null,
                "vehiclePrice": {
                    "salePrice": 4098,
                    "wasPrice": null
                },
                "fuel": "Petrol",
                "minimumMonthlyPayment": 92,
                "storeName": "Cardiff",
                "monthlyPayment": 92,
                "registration": "WF61DWJ",
                "displayColour": "Blue",
                "topFeatures": [
                    "USB/Auxiliary",
                    "CD Player"
                ],
                "vehicleCapDetails": {
                    "capDerivativeName": "1.2 Studio 3dr [Start Stop]",
                    "bodyStyle": "Hatchback",
                    "capModelName": "KA HATCHBACK",
                    "engineSize": "",
                    "capMakeName": "FORD",
                    "presentationRange": "Ka",
                    "capRangeName": "KA",
                    "presentationMake": "Ford"
                }
            }
        };
        console.log('/api/car/'+ this.props.id);
        fetch('/api/car/'+ this.props.id)
            .then(response  => response.json())
            .then(data => this.setState({carData:data}));
    }
    render() {
        console.log(this.state);
        return (
            <article className="singlePage">
                <button id="closeButton" onClick={this.props.clearid}>Close</button>
                <h1>{this.state.carData.vehicleCapDetails.capModelName}</h1>
                <figure>
                    <img src={this.state.carData.displayImage.large} />
                    <figcaption>
                        <ul>
                            <li>{this.state.carData.year} Year</li>
                            <li>{this.state.carData.statistics.mpg} MPG</li>
                            <li>{this.state.carData.vehicleCapDetails.engineSize} Engine Size</li>
                            <li>{this.state.carData.statistics.insuranceGroup} Insurance</li>
                        </ul>
                        <button>£{this.state.carData.vehiclePrice.salePrice}<span>Buy Now</span></button>
                        <p>{this.state.carData.autotraderDescription}</p>
                    </figcaption>
                </figure>
            </article>
        );
    }

}
export default SingleCar;
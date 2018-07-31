import React, { Component } from 'react';
import CarMini from './CarMini';


class CarList extends Component {

    render() {
        var keyData = this.props.carlistings["cars"];
        var carList = "";
        function setCarID(carid) {
            this.props.setCarId(carid);
        }
        if(keyData)  {
            carList = keyData.map(key =>
                <CarMini cdata={key} setcarid={setCarID.bind(this)} />
            );
        }
        return (
        <main>
            {carList}
        </main>
        );
    }

}
export default CarList;
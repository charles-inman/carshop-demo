import React, { Component } from 'react';
import SearchTerms from './components/SearchTerms';
import CarList from './components/CarList';
import SingleCar from './components/SingleCar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carData: {},
            keyData: props.keys,
            doors: [2,5],
            drivetrain: [],
            colour:[],
            page:0,
            start:0,
            carid:""
        };

    }
    componentWillMount()  {

      fetch('/api/searchkeys')
        .then(response  => response.json())
        .then(data => this.setState({keyData:data}));
        var colourString = "null";
        if(this.state.colour.length != 0) {
            colourString = "";
            for(var i = 0;i < this.state.colour.length;i++) {
                if(i != 0)
                    colourString += ",";
                colourString += this.state.colour[i];
            }
        }
        var drivetrainStr = "null";
        if(this.state.drivetrain.length != 0) {
            drivetrainStr = "";
            for(var i = 0;i < this.state.drivetrain.length;i++) {
                if(i != 0)
                    drivetrainStr += ",";
                drivetrainStr += this.state.drivetrain[i];
            }
        }
        var doorsString = "null";
        if(this.state.doors.length != 0) {
            doorsString = this.state.doors[0] + "," + this.state.doors[1];
        }
        fetch('/api/carsearch/40/' + this.state.page + '/' + doorsString + '/'+ colourString + '/' + drivetrainStr)
            .then(response  => response.json())
            .then(data => this.setState({carData:data}));

    }
  render() {
      function clearCarId() {
          this.setState({carid:""});
      }
      function setCarId(carID) {
        this.setState({carid:carID});
      }
      function getNewCars(el) {

          var colourString = "null";
          if(el.state.colour.length != 0) {
              colourString = "";
              for(var i = 0;i < el.state.colour.length;i++) {
                  if(i != 0)
                      colourString += ",";
                  colourString +=  el.state.colour[i];
              }
          }
          var drivetrainStr = "null";
          if(el.state.drivetrain.length != 0) {
              drivetrainStr = "";
              for(var i = 0;i < el.state.drivetrain.length;i++) {
                  if(i != 0)
                      drivetrainStr += ",";
                  drivetrainStr += el.state.drivetrain[i];
              }
          }
          var doorsString = "null";
          if(el.state.doors.length != 0) {
              doorsString = el.state.doors[0] + "," + el.state.doors[1];
          }
          fetch('/api/carsearch/40/'+ el.state.page + '/' + doorsString + '/'+ colourString + '/' + drivetrainStr)
              .then(response  => response.json())
              .then(data => el.setState({carData:data}));
      }
      //All generated inputs update the current state here so we can reload the search
     function updateStateBySlider(arrayItem,name) {
         let newState = Object.assign({}, this.state);
         newState[name] = arrayItem;
         this.setState(newState);
         if(arrayItem[0] !== this.state[name][0] || arrayItem[1] !== this.state[name][1])
             getNewCars(this);
      }
     function updateStateByName(arrayItem,name) {
         let newState = this.state;
          if(newState[name].indexOf(arrayItem) > -1) {
              const index = newState[name].indexOf(arrayItem);
              newState[name].splice(index, 1);
          }
          else {
              newState[name].push(arrayItem);
          }
         this.setState(newState);
         getNewCars(this);
      }
      var insertData = <div>
          <SearchTerms updateslider={updateStateBySlider.bind(this)} updatestate={updateStateByName.bind(this)} keys={this.state.keyData} />
          <CarList page={this.state.page} setCarId={setCarId.bind(this)}  carlistings={this.state.carData} />

      </div>;
      if(this.state.carid != "") {
          insertData = <SingleCar id={this.state.carid} clearid={clearCarId.bind(this)} />
      }
    return (

      <div className="App">
          {insertData}
      </div>
    );
  }
}

export default App;

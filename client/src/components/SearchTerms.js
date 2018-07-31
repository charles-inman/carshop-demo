import React, { Component } from 'react';
import DualSlide from './DualSlide';
import LabelAdd from './LabelAdd';


class SearchTerms extends Component {

  render() {
      var keyData = this.props.keys;
      var namesList = "";

      var updateState = this.props.updatestate;
      var updateStateDual = this.props.updateslider;
      if(this.props.keys != undefined) {
          var keylist = Object.keys(this.props.keys);
           namesList = keylist.map(key =>
              <fieldset className="fieldSet" >
                  <legend>{processFieldTitle(key)}</legend>
                  {decideFormInputs(key,keyData)}
              </fieldset >
          );
      }
      // update dualslide call
      function stateDualName(arrayL,name) {
          updateStateDual(arrayL,name);
      }
      // update labelAdd call
      function stateSearchName(arrayItem,name) {
          updateState(arrayItem,name);
      }
      function processFieldTitle(key) {
        return key.replace( /([A-Z])/g, " $1" );
      }
      function decideFormInputs(key,keyData) {
        if(typeof keyData[key][0] === "string") {
            if (keyData[key].length === 2) {
                var allInclude = keyData[key].map(cast =>
                    <label>{cast}<input type="radio" name={key}/></label>
                );
                return <div>
                    <label>All <input type="radio" name={key}/></label>
                    {allInclude}
                </div>;
            }
            else if (keyData[key].length < 6) {
                return keyData[key].map(cast =>
                    <LabelAdd stateByName={stateSearchName} nameToState="drivetrain" text={cast}/>
                );
            }
            else {
                var createListings = keyData[key].map(cast =>
                    <li><LabelAdd stateByName={stateSearchName} nameToState="colour" text={cast}/></li>
                );
                return <ul>
                    {createListings}
                </ul>;
            }
        }
        else {
            return <div>
                <DualSlide keyc={key} dualName={stateDualName} initialMin={keyData[key][0]} initialMax={keyData[key][1]} />
            </div>;
        }
    }
    return (
      <aside>
        <h2>Refine Your Search</h2>
        <form>
            { namesList }
        </form>
      </aside>
    );
  }
}
export default SearchTerms;

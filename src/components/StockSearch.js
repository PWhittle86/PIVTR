import React from 'react';
import DisplayInfo from './DisplayInfo.js';

class StockSearch extends React.Component {
  // since ES6 no need to define state in constructor
  state = {
    // searchText: '',
    result: undefined
  }

  onSearchTextChange = (event) => { // onChange passes in an event object
    // this.setState({searchText: event.target.value});
    const searchText = event.target.value;
    if(searchText.length >= 2 && searchText.length <= 5) {
      fetch(`http://localhost:3000/quote?symbol=${searchText}`)
      .then(response => response.json())
      .then(response => this.setState({result: response}));
    }
  }

  render(){
    return(
      <div id="stock-search">
        <input type="text" placeholder="Search.." onChange={this.onSearchTextChange} />
        { this.state.result ? <DisplayInfo quote={this.state.result}/> : undefined }
      </div>

    )
  }
}

export default StockSearch;

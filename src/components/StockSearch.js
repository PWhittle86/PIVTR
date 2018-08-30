import React from 'react';
import DisplayInfo from './DisplayInfo.js';
import {debounce} from 'debounce';

class StockSearch extends React.Component {
  // since ES6 no need to define state in constructor
  state = {
    result: undefined
  }

// onChange passes in an event object
  onSearchTextChange = debounce((event) => {
    // this.setState({searchText: event.target.value});
    const searchText = event.target.value;
    if(searchText.length >= 2 && searchText.length <= 5) {
      fetch(`http://heroku_pxbjnrdv:3001/quote?symbol=${searchText}`)
      .then(response => response.json())
      .then(response => this.setState({result: response}));
    }
  }, 500);

  onKeyDown = (event) => {
    // keyCode 8 = backspace
    if(event.keyCode === 8) this.setState({result: undefined})
  }

  render(){
    return(
      <div id="stock-search">
        <h2>Search box</h2>
        <input type="text"
          placeholder="Search.."
          // need to persist SyntheticEvent https://reactjs.org/docs/events.html -> React event pooling
          onChange={(e) => { e.persist(); this.onSearchTextChange(e) }}
          onKeyDown={this.onKeyDown}/>
        { this.state.result ? <DisplayInfo quote={this.state.result} portfolio={this.props.portfolio} createStock={this.props.createStock}/> : undefined }
      </div>

    )
  }
}

export default StockSearch;

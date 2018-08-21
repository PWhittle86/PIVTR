import React, { Component } from 'react';
import './App.css';
import StockContainer from './containers/StockContainer.js'


class App extends Component {
  render() {
    return (
      <div className="main-elements">
        <StockContainer />
      </div>
    )
  }
}

export default App;

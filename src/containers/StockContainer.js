import React from 'react';
import StockTable from '../components/StockTable.js';

class StockContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: {}
    }
  }

  componentDidMount(){
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(stocks => this.setState(stocks));
  }

  render(){
    return(
        <React.Fragment>
            <StockTable stocks={this.state.stocks}/>
        </React.Fragment>
    )
  }
}

export default StockContainer;

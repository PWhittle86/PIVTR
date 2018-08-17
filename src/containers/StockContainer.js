import React from 'react';
import './StockContainer.css';
import StockTable from '../components/StockTable.js'
import InfoChart from '../components/InfoChart.js'
import SearchedStock from '../components/SearchedStock.js'

class StockContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(stocks => this.setState({stocks}));
  }

  render(){
    return(
        <React.Fragment>
          <div class="main-elements">
            <div class="top-elements">
          <div class="stock-table">
            <StockTable/>
            </div>
            <div class="found-stock">
            <SearchedStock/>
            </div>
            </div>
            <div class="info-chart">
            <InfoChart/>
            </div>


            </div>
        </React.Fragment>
    )
  }
}


export default StockContainer;

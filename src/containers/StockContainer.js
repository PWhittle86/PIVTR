import React from 'react';

import './StockContainer.css';
import StockTable from '../components/StockTable.js'
import InfoChart from '../components/InfoChart.js'
import SearchedStock from '../components/SearchedStock.js'
import PortfolioTable from '../components/PortfolioTable.js';
import StockSearch from '../components/StockSearch.js';


class StockContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: [],
      portfolio: []
    }
  }

  componentDidMount(){
    this.fetchCurrentStocks();
    this.fetchUserProfile();
  }

  fetchCurrentStocks = () => {
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(stocks => this.setState({stocks: stocks}));
  }

  fetchUserProfile = () => {
    fetch('http://localhost:3001/stocks')
    .then(response => response.json())
    .then(portfolio => this.setState({portfolio: portfolio}));
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

      <section>
        <section id="stock-table-search">
            <PortfolioTable portfolio={this.state.portfolio}/>
            <StockSearch />
        </section>

        <StockTable stocks={this.state.stocks}/>
      </section>
    )
  }
}


export default StockContainer;

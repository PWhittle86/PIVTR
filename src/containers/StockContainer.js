import React from 'react';
import StockTable from '../components/StockTable.js';
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

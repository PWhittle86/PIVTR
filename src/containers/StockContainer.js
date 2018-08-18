import React from 'react';
import './StockContainer.css';
import StockTable from '../components/StockTable.js'
import InfoChart from '../components/InfoChart.js'
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

  onStockSave = (stock) => {
    //spread operator https://davidwalsh.name/spread-operator
    // onStockSave sends up state change from <DisplayInfo/>
    this.setState({ portfolio: [...this.state.portfolio, stock] })
  }

  render(){
    return(
      <React.Fragment>
        <div className="top-elements">
          <div className="portfolio-table box">
              <PortfolioTable portfolio={this.state.portfolio}/>
          </div>
          <div className="found-stock box">
              <StockSearch onStockSave={this.onStockSave} />
          </div>
        </div>
        <div className="info-chart box">
            <InfoChart/>
            {/* <StockTable stocks={this.state.stocks}/> */}
            {/* <-keep this, might need later  */}
        </div>
      </React.Fragment>
    )
  }
}


export default StockContainer;

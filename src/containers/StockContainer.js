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

  render(){
    return(

        <React.Fragment>
          <div className="main-elements">
            <div className="top-elements">
          <div className="portfolio-table">
            <PortfolioTable portfolio={this.state.portfolio}/>
            {/* <StockTable/> <- is this PortfolioTable? */}
            </div>
            <div className="found-stock">
              <StockSearch />
            {/* <SearchedStock/> */}
            {/* <-is this StockSearch? */}
            </div>
            </div>
            <div className="info-chart">
            <InfoChart/>
            {/* <StockTable stocks={this.state.stocks}/> */}
            </div>
          </div>
          {/* <section>
            <section className="stock-table-search">
                <PortfolioTable portfolio={this.state.portfolio}/>
                <StockSearch />
            </section>

            <StockTable stocks={this.state.stocks}/>
          </section> */}
        </React.Fragment>


    )
  }
}


export default StockContainer;

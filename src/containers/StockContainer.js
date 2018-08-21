import React from 'react';
import './StockContainer.css';
// import StockTable from '../components/StockTable.js';
import InfoChart from '../components/InfoChart.js';
import PortfolioTable from '../components/PortfolioTable.js';
import StockSearch from '../components/StockSearch.js';
import Rotator from '../components/Rotator.js';
import InfoCompany from '../components/InfoCompany.js';

class StockContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: [],
      portfolio: [],
      selectedStock: {epic: "aapl"}
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

  onStockSelect = (stock) => {
    this.setState({selectedStock: stock});
  }

  onStockSave = (stock) => {
    // onStockSave sends up state change from <DisplayInfo/>
    const portfolio = this.state.portfolio;
    if(portfolio && portfolio.length > 0) {
      const index = portfolio.findIndex(currentStock => currentStock.epic === stock.epic);
      // we already have this -> increment counter
      if(index !== -1) {
        portfolio[index].count++;
        this.setState({ portfolio })
      // new item, add it to portfolio without sending request to server
      } else {
        // create an object that matches the mongo schema
        const portfolioStock = {
          epic: stock.epic,
          name: stock.name,
          count: 1,
          avgChange: stock.change,
          avgPrice: stock.price
        }
        //spread operator https://davidwalsh.name/spread-operator
        this.setState({ portfolio: [...this.state.portfolio, portfolioStock] });
      }
    }
  }

  render(){
    return(
      <React.Fragment>
        <section id="app-header"><h1>PIVTR</h1></section>
        <Rotator stocks={this.state.stocks}/>
        <div id="mission-statement" className="box">

          <p>At PIVTR we believe in one thing: optimising frictionless web-readiness. But what does that mean?</p>
          <p>It means we're a forward-thinking anti-conglomerate who work tirelessly to incubate cutting-edge paradigms and above all else: synergise backwards overflow.</p>
          <p>What this means for your personal portfolio is that you can be sure we won't just repurpose out-of-the-box methodologies. We'll evolve robust partnerships. Seize ubiquitous communities. We will <i>innovate transparent e-tailers.</i></p>
          <p>So don't stick in the mud of the beaten path you've walked before. Don't be a limiter. Be a <b>PIVTR</b>.</p>

        </div>
        <div className="top-elements">
          <div className="portfolio-table box">
              {this.state.stocks.length >= 1 && this.state.portfolio.length >= 1 ? <PortfolioTable onStockSelect={this.onStockSelect} stocks={this.state.stocks} portfolio={this.state.portfolio} refreshPortfolio={this.fetchUserProfile}/> : null}
          </div>
          <div className="found-stock box">
              <StockSearch onStockSave={this.onStockSave} />
          </div>
        </div>
        <div className="info-chart box">
            <InfoChart selectedStock={this.state.selectedStock}/>
            {/* <StockTable stocks={this.state.stocks}/> */}
            {/* <-keep this, might need later  */}
        </div>
        <div className="info_news">
          <InfoCompany selectedStock={this.state.selectedStock}/>
        </div>
        <footer id="footer">
            <div id="footer-content">
              <section>

              </section>
              <section id="impressum">
                <p>PIVTR © 2018 <a href="https://github.com/camiller4e">Campbell Miller</a> & <a href="https://github.com/PWhittle86">Peter Whittle</a> & <a href="https://github.com/adriflorence">Adri Florence</a></p>
              </section>
            </div>
        </footer>
      </React.Fragment>
    )
  }
}


export default StockContainer;

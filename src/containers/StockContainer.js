import React from 'react';
import './StockContainer.css';
// import StockTable from '../components/StockTable.js';
import InfoChart from '../components/InfoChart.js';
import PortfolioTable from '../components/PortfolioTable.js';
import StockSearch from '../components/StockSearch.js';
import Rotator from '../components/Rotator.js';
import StockPieChart from '../components/StockPieChart.js';
import InfoCompany from '../components/InfoCompany';
// import Favourites from '../components/Favourites.js';

class StockContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: [],
      portfolio: [],
      showFavourites: false,
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

  sendFavourite = (epic) => {
    fetch(`http://localhost:3001/favorites`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({epic: epic})
    });
  }

  removeFavourite = (epic) => {
    fetch(`http://localhost:3001/favorites/${epic}`, {
      method: 'delete'
    });
  }

  switchFavourite = (epic) => {
    // console.log(this.state);
    const updatedPortfolio = this.state.portfolio.map(element => {
      if(element.epic === epic) {
        element.favorite = !element.favorite;
        if(element.favorite) {
          this.sendFavourite(epic);
        } else {
          this.removeFavourite(epic);
        }
      }
      return element;
    });
    console.log(updatedPortfolio);
    this.setState({portfolio: updatedPortfolio});
  }

  filterFavourites = () => {
    const favs = this.state.portfolio.filter(stock => stock.favorite);
    return favs;
  }

  showFavouritesAlert = () => {
    this.setState({showFavourites : !this.state.showFavourites})
  }

  render(){
    return(
      <React.Fragment>
        <section id="app-header">
          <h1>PIVTR</h1>
          {/* <button id="notifications" onClick={this.showFavouritesAlert}>
          <span>1</span>
        </button>
        {this.state.showFavourites ? <Favourites favorites={this.filterFavourites}/> : undefined} */}
      </section>

      <Rotator stocks={this.state.stocks}/>
      <div className="intro box">
        <p>Don't be a limiter. Be a <b>PIVTR</b>.</p>
      </div>

      <div className="top-elements">
        <div className="pie-chart box">
          <StockPieChart portfolio={this.state.portfolio}/>
        </div>

        <div className="stock-search box">
          <StockSearch onStockSave={this.onStockSave} />
        </div>
      </div>

      <div className="portfolio-table box">
        {this.state.stocks.length >= 1 && this.state.portfolio.length >= 1 ?
          <PortfolioTable onStockSelect={this.onStockSelect}
            stocks={this.state.stocks}
            portfolio={this.state.portfolio}
            refreshPortfolio={this.fetchUserProfile}
            switchFavourite={this.switchFavourite}
          /> : null}
        </div>

        <div className = "infoContainer box">
          <div className="info-chart">
            <InfoChart selectedStock={this.state.selectedStock}/>
          </div>
          <div className="info_news">
            <InfoCompany selectedStock={this.state.selectedStock}/>
          </div>
        </div>


        <footer id="footer">
          <div id="footer-content">
            <section id="footer-image">
              <img src="/images/footer.jpg"></img>
            </section>
            <section id="mission-statement">
              <p>At PIVTR we believe in one thing: optimising frictionless web-readiness. But what does that mean?</p>
              <p>It means we're a forward-thinking anti-conglomerate that works tirelessly to incubate cutting-edge paradigms and above all else: synergise backwards overflow.</p>
              <p>What this means for your personal portfolio is that you can be sure we won't just repurpose out-of-the-box methodologies. We'll evolve robust partnerships. Seize ubiquitous communities. We will <i>innovate transparent e-tailers.</i></p>
              <p>So don't stick in the mud of the beaten path you've walked before. Don't be a divot. PIVOT.</p>
            </section>
            <section id="impressum">
              <p>PIVTR © 2018 <a href="https://github.com/camiller4e">Campbell Miller</a> & <a href="https://github.com/PWhittle86">Peter Whittle</a> & <a href="https://github.com/adriflorence">Adri Florence</a>
              <a href="#"><img src="/images/barchart.png"></img></a></p>
            </section>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}

export default StockContainer;

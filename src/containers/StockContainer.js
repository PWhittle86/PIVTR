import React from 'react';
import './StockContainer.css';
import InfoChart from '../components/InfoChart.js';
import PortfolioTable from '../components/PortfolioTable.js';
import StockSearch from '../components/StockSearch.js';
import Rotator from '../components/Rotator.js';
import StockPieChart from '../components/StockPieChart.js';
import InfoCompany from '../components/InfoCompany';
import NotificationBox from '../components/NotificationBox.js';

class StockContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: [],
      portfolio: [],
      showFavourites: false,
      selectedStock: {epic: "aapl"},
      portfolioPrices: {},
      portfolioChanges: {}
    }
  }

  componentDidMount(){
    this.fetchCurrentStocks();
    this.fetchUserProfile();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.portfolio !== this.state.portfolio){
      this.fetchStockPrices();
      this.fetchStockChanges();
    }
  }

  fetchCurrentStocks = () => {
    // fetch('http://localhost:3001/') Original code. Amended for online deployment.
    // fetch('mongodb://dbuser:password1@ds241012.mlab.com:41012/stockdb/')
    .then(response => response.json())
    .then(stocks => this.setState({stocks: stocks}));
  }

  fetchUserProfile = () => {
    // fetch('http://localhost:3001/stocks') Original code. Amended for online deployment.
    fetch('mongodb://dbuser:password1@ds241012.mlab.com:41012/stockdb/stocks')
    .then(response => response.json())
    .then(portfolio => this.setState({portfolio: portfolio}))
  }

  fetchStockPrices = () => {
    let priceObject = {};
    const priceInserter = (quote, object) =>{
      object[quote.symbol] = quote.latestPrice;
    }

    this.state.portfolio.forEach((stock) => {
      fetch(`https://api.iextrading.com/1.0/stock/${stock.epic}/quote`)
      .then(response => response.json())
      .then(quote => priceInserter(quote, priceObject))
    })
    this.setState({portfolioPrices: priceObject})
  }

  //Todo - refactor stock changes so that the function is covered by fetchStockPrices. Shouldn't be necessary to poll the api twice.

  fetchStockChanges= () => {
    let changeObject = {};
    const changeInserter = (quote, object) =>{
      object[quote.symbol] = quote.changePercent;
    }

    this.state.portfolio.forEach((stock) => {
      fetch(`https://api.iextrading.com/1.0/stock/${stock.epic}/quote`)
      .then(response => response.json())
      .then(quote => changeInserter(quote, changeObject))
    })
    this.setState({portfolioChanges: changeObject})
  }

  onStockSelect = (stock) => {
    this.setState({selectedStock: stock});
  }

  // function for portfolioTable.js for aggragated data
  createStock = (quote) => {
    const stock = {
      name: quote.name,
      epic: quote.epic,
      price: quote.avgPrice,
      change: quote.avgChange,
      favorite: false,
      time: Date.now()
    }
    this.saveStock(stock);
  }

  // function for displayInfo.js through stockSearch.js
  createStockFromAPI = (quote) => {
    const stock = {
      name: quote.companyName,
      epic: quote.symbol,
      price: quote.latestPrice,
      change: quote.change,
      favorite: false,
      time: Date.now()
    }
    this.saveStock(stock);
  }

  saveStock = (stock) => {
    // fetch(`http://localhost:3001/stocks`, { Original code. Amended for online deployment.
    fetch(`mongodb://dbuser:password1@ds241012.mlab.com:41012/stockdb/stocks`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stock)
    })
    .then(response => response.json())
    .then(response => this.onStockSave(response));
  }

  onStockSave = (stock) => {
    // onStockSave sends up state change from <DisplayInfo/>
    const portfolio = this.props.portfolio;
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
          avgPrice: stock.price,
          favorite: false
        }
        //spread operator https://davidwalsh.name/spread-operator
        this.setState({ portfolio: [...this.state.portfolio, portfolioStock] })
      }
    }
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
          avgPrice: stock.price,
          favorite: false
        }
        //spread operator https://davidwalsh.name/spread-operator
        this.setState({ portfolio: [...this.state.portfolio, portfolioStock] });
      }
    }
  }

  // functionality for favourites
  sendFavourite = (epic) => {
    // fetch(`http://localhost:3001/favorites`, { Original code. Amended for online deployment.
    fetch(`mongodb://dbuser:password1@ds241012.mlab.com:41012/stockdb/favorites`, {

      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({epic: epic})
    });
  }

  removeFavourite = (epic) => {
    // fetch(`http://localhost:3001/favorites/${epic}`, { Original code. Amended for online deployment.
    fetch(`mongodb://dbuser:password1@ds241012.mlab.com:41012/stockdb/favorites/${epic}`, {

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
    this.setState({ portfolio: updatedPortfolio });
  }

  filterFavourites = () => {
    const favs = this.state.portfolio.filter(stock => stock.favorite);
    return favs;
  }

  incrementNotificationCount = () => {
    this.setState({ notificationCounter: this.state.notificationCounter + 1 });
  }

  toggleNotifications = () => {
    if(this.state.showNotifications) {
      this.setState({ showNotifications : !this.state.showNotifications, notificationCounter: 0 });
    } else {
        this.setState({ showNotifications : !this.state.showNotifications });
    }
  }

  notificationBoxVisible = () => {
    const display = this.state.showNotifications ? "block" : "none";
    return {display} // { display: display }
  }

  render(){
    return(
      <React.Fragment>
        <section id="app-header">
          <h1>PIVTR</h1>
          <button id="notification-icon" onClick={this.toggleNotifications}>
            {this.state.notificationCounter > 0 ? <span>{this.state.notificationCounter}</span> : undefined }
          </button>
          <div style={this.notificationBoxVisible()}>
             <NotificationBox favStocks={this.filterFavourites()} incrementNotificationCount={this.incrementNotificationCount}/>
          </div>
        </section>

        <Rotator stocks={this.state.stocks}/>
        <div className="slogan box">
              <h2>Don't be a limiter. Be a <b>PIVTR</b>.</h2>
        </div>

        <div className="top-elements">
          <div className="pie-chart box">
              <StockPieChart portfolio={this.state.portfolio}/>
          </div>

          <div className="stock-search box">
              <StockSearch onStockSave={this.onStockSave}
                           portfolio={this.state.portfolio}
                           createStock={this.createStockFromAPI}/>
          </div>
        </div>

      <div className="portfolio-table box">
        {this.state.stocks.length >= 1 && this.state.portfolio.length >= 1 ?
          <PortfolioTable onStockSelect={this.onStockSelect}
            stocks={this.state.stocks}
            portfolio={this.state.portfolio}
            createStock={this.createStock}
            refreshPortfolio={this.fetchUserProfile}
            switchFavourite={this.switchFavourite}
            prices={this.state.portfolioPrices}
            changes={this.state.portfolioChanges}
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
              <div className="text-and-impressum">
              <section id="mission-statement">
                  <p>At PIVTR we believe in one thing: optimising frictionless web-readiness. But what does that mean?</p>
                  <p>It means we're a forward-thinking anti-conglomerate that works tirelessly to incubate cutting-edge paradigms and above all else: synergise backwards overflow.</p>
                  <p>What this means for your personal portfolio is that you can be sure we won't just repurpose out-of-the-box methodologies. We'll evolve robust partnerships. Seize ubiquitous communities. We will <i>innovate transparent e-tailers.</i></p>
                  <section id="impressum">
                    <p>PIVTR © 2018 <a href="https://github.com/camiller4e">Campbell Miller</a> &
                    <a href="https://github.com/PWhittle86"> Peter Whittle</a> &
                    <a href="https://github.com/adriflorence"> Adri Florence</a>
                    <a href="#"><img src="/images/barchart.png"></img></a></p>
                  </section>
                  <p id='apiInfo'>All stock information in this project was pulled from the IEX API. Further information available <a href="https://iextrading.com/developer/">here</a>.</p>

                  </section>

              </div>
            </div>

        </footer>
      </React.Fragment>
    )
  }
}

export default StockContainer;

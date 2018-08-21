import React from 'react';
import SellPopUp from './SellPopUp.js';
import BuyPopUp from './BuyPopUp.js';

class PortfolioTable extends React.Component {

constructor(props){
    super(props);
    this.state = {
      stock_prices: {},
      stock_change: {},
      portfolio_prices: {},
      showSellPopUp: false,
      showBuyPopUp: false,
      popupStock: undefined
    }
  }

sendStockUp(stock){
      this.props.onStockSelect(stock)
    }

  componentDidMount(){

    const priceObject = {};
    const changeObject = {};
    const portfolioObject = {};

    this.props.stocks.forEach((quote) => {
      priceObject[quote.symbol] = quote.latestPrice;
      changeObject[quote.symbol] = quote.changePercent;
    });

    this.props.portfolio.forEach((stock) => {
      portfolioObject[stock.symbol] = stock.avgPrice;
    })

    this.setState({stock_prices: priceObject, stock_change: changeObject, portfolio_prices: portfolioObject});
  }

  createStock = (quote) => {
    const stock = {
      name: quote.name,
      epic: quote.epic,
      price: quote.avgPrice,
      change: quote.avgChange,
      time: Date.now()
    }
    this.saveStock(stock);
  }

  saveStock = (stock) => {
    fetch(`http://localhost:3001/stocks`, {
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
          avgPrice: stock.price
        }
        //spread operator https://davidwalsh.name/spread-operator
        this.setState({ portfolio: [...this.state.portfolio, portfolioStock] });
      }
    }
  }

  showSellPopUp = (stock) => {
    this.setState({showSellPopUp: !this.state.showSellPopUp, popupStock: stock})
  }

  showBuyPopUp = (stock) => {
    this.setState({showBuyPopUp: !this.state.showBuyPopUp, popupStock: stock})
  }

  whichColor = (stringToCheck) => {
    if(stringToCheck.charAt(0) === "-") {
      return {color: "#e91e63"}
    } else {
      return {color: "#4caf50"}
    }
  }

  updateHeart = () => {
  let portfolio = this.props.portfolio;
    for(let stock of portfolio) {
      if(stock.favorite) {

      }
    }
  }

  sendFavourite = (epic) => {
    fetch(`http://localhost/favorites`, {
      method: 'post',
      body: {epic: epic}
    });
  }

  render() {

    const stockRow = this.props.portfolio.map((stock, index) => {

      return (
        <tr key={index}>
          <td><button className="heart" onClick={()=> this.addHeart(stock.epic)}></button></td>
          <td className="ellipsis" onClick={()=>this.sendStockUp(stock)}>{stock.name}</td>
          <td>{stock.epic}</td>
          <td>{this.state.stock_prices[stock.epic]}</td>
          <td style={this.whichColor(`${this.state.stock_change[stock.epic]}`)}>{this.state.stock_change[stock.epic]}</td>
          <td>{stock.count}</td>
          <td>${parseFloat(this.state.stock_prices[stock.epic] * stock.count).toFixed(2)}</td>
          <td>${parseFloat(stock.avgPrice * stock.count).toFixed(2)}</td>
          <td>${parseFloat((this.state.stock_prices[stock.epic] * stock.count) - (stock.avgPrice * stock.count)).toFixed(2)}</td>
          {/* <td>{parseFloat(stock.avgChange).toFixed(2)}</td>
          <td>{parseFloat(stock.avgPrice).toFixed(2)}</td> */}

          <td><button className="buy button" onClick={() => this.showBuyPopUp(stock)}>buy</button></td>
          <td><button className="sell button" onClick={() => this.showSellPopUp(stock)}>sell</button></td>
        </tr>
      )
    });

    return (
      <section>
        <table className="stock-table" cellSpacing="0">
          <thead>
            <tr>
              <th></th>
              <th className="ellipsis">Name</th>
              <th>Epic</th>
              <th>Current Price</th>
              <th>Change %</th>
              <th>Shares Held</th>
              <th>Total Market Value</th>
              <th>Total Book Cost</th>
              <th>Profit/Loss</th>
              {/* <th>Total Change</th> */}
            </tr>
          </thead>
          <tbody>
              { this.state.showBuyPopUp ? <BuyPopUp stock={this.state.popupStock} close={this.showBuyPopUp} createStock={this.createStock}/> : undefined }
              { this.state.showSellPopUp ? <SellPopUp stock={this.state.popupStock} close={this.showSellPopUp} refreshPortfolio={this.props.refreshPortfolio}/> : undefined }
              { stockRow }
              <tr></tr>
          </tbody>
          <tfoot>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Overall Market Value</th>
            <th>Overall Book Cost</th>
            <th>Overall Profit</th>
            <th></th>
          </tfoot>
        </table>
      </section>
    )

  }

}


export default PortfolioTable;

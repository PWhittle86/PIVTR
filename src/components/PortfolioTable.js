import React from 'react';
import SellPopUp from './SellPopUp.js';

class PortfolioTable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      stock_prices: {},
      stock_change: {},
      portfolio_prices: {},
      showSellPopUp: false,
      popupStock: undefined
    }
  }

  componentDidMount(){

    const priceObject = {};
    const changeObject = {};
    const portfolioObject = {};

    this.props.stocks.forEach((quote) => {
      priceObject[quote.symbol] = quote.latestPrice;
    });

    this.props.stocks.forEach((quote) => {
      changeObject[quote.symbol] = quote.changePercent;
    })

    this.props.portfolio.forEach((stock) => {
      portfolioObject[stock.symbol] = stock.avgPrice;
    })

    this.setState({stock_prices: priceObject});
    this.setState({stock_change: changeObject});
    this.setState({portfolio_prices: portfolioObject});
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

  render() {

    const stockRow = this.props.portfolio.map((stock, index) => {

      return (
        <tr key={index}>
          <td className="ellipsis">{stock.name}</td>
          <td>{stock.epic}</td>
          <td>${this.state.stock_prices[stock.epic]}</td>
          <td>{this.state.stock_change[stock.epic]}</td>
          <td>{stock.count}</td>
          <td>${parseFloat(this.state.stock_prices[stock.epic] * stock.count).toFixed(2)}</td>
          <td>${parseFloat(stock.avgPrice * stock.count).toFixed(2)}</td>
          <td>${parseFloat((this.state.stock_prices[stock.epic] * stock.count) - (stock.avgPrice * stock.count)).toFixed(2)}</td>
          {/* <td>{parseFloat(stock.avgChange).toFixed(2)}</td>
          <td>{parseFloat(stock.avgPrice).toFixed(2)}</td> */}

          {/* <td>dd-mm-yy</td> */}
          <td><button className="buy button" onClick={() => this.createStock(stock)}>buy</button></td>
          <td><button className="sell button" onClick={() => this.showSellPopUp(stock)}>sell</button></td>
        </tr>
      )
    });



    return (
      <section>
        <table className="stock-table" cellSpacing="0">
          <thead>
            <tr>
              <th className="ellipsis">Name</th>
              <th>Epic</th>
              <th>Current Price</th>
              <th>Change %</th>
              <th>Shares Held</th>
              <th>Total Market Value</th>
              <th>Total Book Cost</th>
              <th>Profit/Loss</th>
              {/* <th>Total Change</th> */}

              {/* <th>Date (??)</th> */}
            </tr>
          </thead>
          <tbody>
              { this.state.showSellPopUp ? <SellPopUp stock={this.state.popupStock} close={this.showSellPopUp}/> : undefined }
              { stockRow }
              <tr></tr>
          </tbody>
          <tfoot>
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

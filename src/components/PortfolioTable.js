import React from 'react';
import SellPopUp from './SellPopUp.js';

class PortfolioTable extends React.Component {

  state = {
      showSellPopUp: false
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

  showSellPopUp = () => {
    this.setState({showSellPopUp: !this.state.showSellPopUp})
  }

  render() {

    const stockRow = this.props.portfolio.map((stock, index) => {
      return (
        <React.Fragment>
          { this.state.showSellPopUp ? <SellPopUp stock={stock} /> : undefined }
          <tr key={index}>
            <td className="ellipsis">{stock.name}</td>
            <td>{stock.epic}</td>
            <td>{parseFloat(stock.avgPrice).toFixed(3)}</td>
            <td>{parseFloat(stock.avgChange).toFixed(3)}</td>
            <td>{stock.count}</td>
            <td>dd-mm-yyyy</td>
            <td><button className="buy button" onClick={() => this.createStock(stock)}>buy</button></td>
            <td><button className="sell button" onClick={this.showSellPopUp}>sell</button></td>
          </tr>
        </React.Fragment>
      )
    });

    return (
      <section>
        <table className="stock-table" cellSpacing="0">
            <thead>
              <tr>
                <th className="ellipsis">Name</th>
                <th>Epic</th>
                <th>Avg. Price</th>
                <th>Avg. Change</th>
                <th>Qty</th>
                <th>Date (??)</th>
              </tr>
            </thead>
            <tbody>
                { stockRow }
            </tbody>
        </table>
      </section>
    )
  }
}

export default PortfolioTable;

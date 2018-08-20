import React from 'react';

class PortfolioTable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      stock_prices: {}
    }
  }

  componentDidMount(){

    const priceObject = {}

    this.props.stocks.forEach((quote) => {
      priceObject[quote.symbol] = quote.latestPrice;
    });

    this.setState({stock_prices: priceObject});
  }

  render() {

    const stockRow = this.props.portfolio.map((stock, index) => {

      return (
        <tr key={index}>
          <td className="ellipsis">{stock.name}</td>
          <td>{stock.epic}</td>
          <td>{this.state.stock_prices[stock.epic]}</td>
          <td>{parseFloat(stock.avgPrice).toFixed(2)}</td>
          <td>{parseFloat(stock.avgPrice * stock.count).toFixed(2)}</td>
          <td>{parseFloat(stock.avgChange).toFixed(2)}</td>
          <td>{stock.count}</td>
          <td>dd-mm-yy</td>
          <td><button className="buy button">buy</button></td>
          <td><button className="sell button">sell</button></td>
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
              <th>Avg. Price</th>
              <th>Total Value</th>
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

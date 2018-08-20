import React from 'react';

class PortfolioTable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      stock_prices: {},
      stock_change: {},
      portfolio_prices: {}
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
            { stockRow }
            <tr></tr>
          </tbody>
          <tfoot>
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

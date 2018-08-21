import React from 'react';

class PortfolioTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }

    this.generateChart = this.generateChart.bind(this);

}


    generateChart() {
      this.props.clickButton(this.selectedStock.symbol)}
      // get the symbol of the stock which has been clicked, pass it in to the url which infochart fetches


    render(){

      const stockRow = this.props.portfolio.map((stock, index) => {
        return (
          <tr key={index}>
            <td className="ellipsis" onClick={this.generateChart}>{stock.name}</td>
            <td>{stock.epic}</td>
            <td>{parseFloat(stock.avgPrice).toFixed(3)}</td>
            <td>{parseFloat(stock.avgChange).toFixed(3)}</td>
            <td>{stock.count}</td>
            <td>dd-mm-yyyy</td>
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

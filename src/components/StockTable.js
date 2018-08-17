import React from 'react';

class StockTable extends React.Component {
  render() {

    const stockRow = this.props.stocks.map((stock, index) => {
      return (
        <tr key={index}>
          <td class="ellipsis">{stock.companyName}</td>
          <td>{stock.symbol}</td>
          <td>{stock.latestPrice}</td>
          <td>{stock.change}</td>
          <td><button>buy</button></td>
          <td><button>sell</button></td>
        </tr>
      )
    });

    return (
      <section id="stock-table">
        <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Epic</th>
                <th>Price</th>
                <th>change</th>
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

export default StockTable;

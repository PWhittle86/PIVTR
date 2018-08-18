import React, {Component} from 'react';

class PortfolioTable extends React.Component {
  render() {

    const stockRow = this.props.portfolio.map((stock, index) => {
      return (
        <table>
        <tr key={index}>
          <td className="ellipsis">{stock.name}</td>
          <td>{stock.epic}</td>
          <td>{stock.price}</td>
          <td>{stock.change}</td>
          <td><button>buy</button></td>
          <td><button>sell</button></td>
        </tr>
      </table>
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
                <th>Change</th>
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

import React from 'react';

class StockTable extends React.Component {
  render() {
    var stockNodes = this.props.stocks.map(function(stock) {
      return (
        <p>{stock["2018-08-16"]["1. open"]}</p>
      );
    });

    return (
      <div className="stockTable">
        {stockNodes}
      </div>
    )
  }
}

export default StockTable;

import React from 'react'

class StockList extends React.Component {
  render() {
    var stockNodes = this.props.data.map(function(comment) {
      return (
        <div> stock. </div>
      );
    });

    return (
      <div className="stockList">
        {stockNodes}
      </div>
    )
  }
}

export default StockList;

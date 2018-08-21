import React from 'react';

class Rotator extends React.Component {

  render(){
    const stockRotatorText = this.props.stocks.slice(0, 10).map((stock, index) => {
      return (
        <span key={index}>
          <span>{stock.companyName}</span>
          <span>"{stock.symbol}"</span>
          <span>{stock.latestPrice}</span>
          <span>{stock.change}</span>
        </span>
      )
    });

    return(
      <div className="rotator">
        <div className="rotator-text">{stockRotatorText}</div>
      </div>
    )
  }
}

export default Rotator;

import React from 'react';

class Rotator extends React.Component {

  getArrows = (stringToCheck) => {
    return (stringToCheck.charAt(0) === "-");
  }

  render(){
    const stockRotatorText = this.props.stocks.slice(0, 10).map((stock, index) => {
      return (
        <span key={index}>
          <span>{stock.companyName}</span>
          <span>"{stock.symbol}"</span>
          <span>{stock.latestPrice}</span>
          <span>{stock.change} {this.getArrows(`${stock.change}`) ? <img src="../images/arrow_down.png"/> : <img src="../images/arrow_up.png"/>} </span>

        </span>
      )
    });

    return (
      <div className="rotator">
        <div className="rotator-text">{stockRotatorText}</div>
      </div>
    )
  }
}

export default Rotator;

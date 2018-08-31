import React from 'react';

class SellPopUp extends React.Component {

  state = {
    stockFromApi: undefined,
    numberToSell: 0
  }

  componentDidMount(){
    this.fetchCurrentPrice();
  }

  componentWillUnmount(){
    this.props.refreshPortfolio();
  }

  fetchCurrentPrice = () => {
    const epic = this.props.stock.epic;
    fetch(`https://api.iextrading.com/1.0/stock/${epic}/quote`)
    .then(response => response.json())
    .then(response => {
      this.setState({stockFromApi: response})
    });
  }

  sellStock = () => {
    const epic = this.props.stock.epic;
    const numberToSell = this.state.numberToSell;
    // fetch(`http://localhost:3001/stocks/${epic}/${numberToSell}`, { Original code. Amended for online deployment.
    fetch(`mongodb://dbuser:password1@ds241012.mlab.com:41012/stockdb/stocks/${epic}/${numberToSell}`, {

        method: 'delete'
    })
    .then( _ => this.props.close());
  }

  // onChange has the event by default
  updateNumber = (event) => {
    const number = event.target.value;
    this.setState({numberToSell: number})
  }

  render(){
    return(
      <section className="red-border popup">
        <h1> Sell {this.props.stock.name} stocks </h1>
        <p> <input type="number"
                   min="1" max={this.props.stock.count}
                   id="number-box"
                   onChange={this.updateNumber}>
            </input> * USD { this.state.stockFromApi ? this.state.stockFromApi.latestPrice : undefined } </p>
        <button className="sell button" onClick={this.sellStock}>sell</button>
      </section>
    )
  }
}

export default SellPopUp;

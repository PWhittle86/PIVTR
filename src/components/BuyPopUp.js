import React from 'react';

class BuyPopUp extends React.Component {

  state = {
    stockFromApi: undefined,
    numberToBuy: 0
  }

  componentDidMount(){
    this.fetchCurrentPrice();
  }

  fetchCurrentPrice = () => {
    const epic = this.props.stock.epic;
    fetch(`https://api.iextrading.com/1.0/stock/${epic}/quote`)
    .then(response => response.json())
    .then(response => {
      this.setState({stockFromApi: response})
    });
  }

  buyStock = () => {
    for (let i = 0; i < this.state.numberToBuy; i++) {
      this.props.createStock(this.props.stock);
    }
    this.props.close();
  }

  // onChange has the event by default
  updateNumber = (event) => {
    const number = event.target.value;
    this.setState({numberToBuy: number})
  }

  render(){
    return(
      <section className="green-border popup">
        <h1> Buy {this.props.stock.name} stocks </h1>
        <p> <input type="number"
                   min="1"
                   id="number-box"
                   onChange={this.updateNumber}>
             </input> * USD { this.state.stockFromApi ? this.state.stockFromApi.latestPrice : undefined } </p>
        <button className="buy button" onClick={this.buyStock}>buy</button>
      </section>
    )
  }
}

export default BuyPopUp;

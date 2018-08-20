import React from 'react';

class SellPopUp extends React.Component {

  state = {
    stockFromApi: undefined,
    numberToSell: undefined
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

  sellStock = () => {
    const epic = this.props.stock.epic;
    const numberToSell = this.state.numberToSell;
    fetch(`http://localhost:3001/stocks/${epic}/${numberToSell}`, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(response => console.log(response));
    console.log(this.props);
    this.props.close();
  }

  // onChange has the event by default
  updateNumber = (event) => {
    const number = event.target.value;
    this.setState({numberToSell: number})
  }

  render(){
    return(
      <section id="sell-box">
        <h1> Sell {this.props.stock.name} stocks </h1>
        <p> <input type="number" min="1" max={this.props.stock.count} placeholder={this.props.stock.count} id="number-box" onChange={this.updateNumber}></input> * USD { this.state.stockFromApi ? this.state.stockFromApi.latestPrice : undefined } </p>
        <button className="sell button" onClick={this.sellStock}>sell</button>
      </section>
    )
  }
}

export default SellPopUp;

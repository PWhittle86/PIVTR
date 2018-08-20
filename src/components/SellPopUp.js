import React from 'react';

class SellPopUp extends React.Component {

  state = {
    stockFromApi: undefined
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

  render(){
    return(
      <section id="sell-box">
        <h1>{this.props.stock.name} - {this.props.stock.epic}</h1>
        <p>current sell price:{ this.state.stockFromApi ? this.state.stockFromApi.latestPrice : undefined }</p>
            <input type="number"></input>
      </section>
    )
  }
}

export default SellPopUp;

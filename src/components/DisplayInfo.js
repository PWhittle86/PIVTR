import React from 'react';
import BuyPopUp from './BuyPopUp.js';

class DisplayInfo extends React.Component {

  state = {
    stockFromApi: undefined,
    numberToBuy: 0
  }

  componentDidMount(){
    this.fetchCurrentPrice();
  }

  fetchCurrentPrice = () => {
    const epic = this.props.quote.symbol;
    fetch(`https://api.iextrading.com/1.0/stock/${epic}/quote`)
    .then(response => response.json())
    .then(response => {
      this.setState({stockFromApi: response})
    });
  }

  buyStock = () => {
    for (let i = 0; i < this.state.numberToBuy; i++) {
      this.createStock(this.props.stock);
    }
  }

  // onChange has the event by default
  updateNumber = (event) => {
    const number = event.target.value;
    this.setState({numberToBuy: number})
  }

  createStock = () => {
    const stock = {
      name: this.props.quote.companyName,
      epic: this.props.quote.symbol,
      price: this.props.quote.latestPrice,
      change: this.props.quote.change,
      time: Date.now()
    }
    this.saveStock(stock);
  }

  saveStock = (stock) => {
    fetch(`http://localhost:3001/stocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(stock)
    })
    .then(response => response.json())
    .then(response => this.onStockSave(response));
  }

  onStockSave = (stock) => {
    // onStockSave sends up state change from <DisplayInfo/>
    const portfolio = this.props.portfolio;
    if(portfolio && portfolio.length > 0) {
      const index = portfolio.findIndex(currentStock => currentStock.epic === stock.epic);
      // we already have this -> increment counter
      if(index !== -1) {
        portfolio[index].count++;
        this.setState({ portfolio })
        // new item, add it to portfolio without sending request to server
      } else {
        // create an object that matches the mongo schema
        const portfolioStock = {
          epic: stock.epic,
          name: stock.name,
          count: 1,
          avgChange: stock.change,
          avgPrice: stock.price,
          favorite: false
        }
        //spread operator https://davidwalsh.name/spread-operator
        this.setState({ portfolio: [...this.state.portfolio, portfolioStock] })
      }
    }
  }

  render(){
    return(
      <React.Fragment>
        <p>{this.props.quote.companyName}</p>
        <p>High: {this.props.quote.high}</p>
        <p>Low: {this.props.quote.low}</p>
        <p>Change: $ {this.props.quote.change} </p>
        <input type="number"
                   min="1"
                   id="number-box"
                   onChange={this.updateNumber}>
             </input> * $ { this.state.stockFromApi ? this.state.stockFromApi.latestPrice : undefined }
        <button className="buy button" onClick={this.buyStock} style={{'margin-left': '10px'}}>buy</button>
      </React.Fragment>
    )
  }


}

export default DisplayInfo;

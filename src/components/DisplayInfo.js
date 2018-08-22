import React from 'react';

class DisplayInfo extends React.Component {

  state = {
    numberToBuy: 0,
    purchaseMessage: undefined
  }


  buyStock = () => {
    for (let i = 0; i < this.state.numberToBuy; i++) {
      this.props.createStock(this.props.quote);
    }
    this.setState({purchaseMessage: "Purchase Succesful!"})
  }

  // onChange has the event by default
  updateNumber = (event) => {
    const number = event.target.value;
    this.setState({numberToBuy: number});
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
             </input> * $ { this.props.quote ? this.props.quote.latestPrice : undefined }
        <button className="buy button" onClick={this.buyStock} style={{'marginLeft': '10px'}}>buy</button>
        {this.state.purchaseMessage ? <p>{this.state.purchaseMessage}</p> : undefined }
      </React.Fragment>
    )
  }

}

export default DisplayInfo;

import React from 'react';

class StockContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(stocks => this.setState({stocks}));
  }

  render(){
    return(
        <React.Fragment>
            <h1>stockcontainer works</h1>
        </React.Fragment>
    )
  }
}

export default StockContainer;

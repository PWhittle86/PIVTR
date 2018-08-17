import React from 'react';
import StockTable from '../components/StockTable.js';
import StockSearch from '../components/StockSearch.js';

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
    .then(stocks => this.setState({stocks: stocks}));
  }

  render(){
    return(
        <section id="stock-table-search">
            <StockTable stocks={this.state.stocks}/>
            <StockSearch />
        </section>
    )
  }
}

export default StockContainer;

import React from 'react';

class InfoCompany extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      companyInfo: {}
    }
  }

  componentDidUpdate(){
    const epic = this.props.selectedStock.epic

    fetch(`https://api.iextrading.com/1.0/stock/${epic}/company`)
    .then(response => response.json())
    .then(companyInfo => this.setState({companyInfo: companyInfo}))
  }

  render(){

    return(
      <React.Fragment>
      <li>
        <ul>{this.state.companyInfo.companyName}</ul>
        <ul>Industry: {this.state.companyInfo.industry}</ul>
        <ul>Website: {this.state.companyInfo.website}</ul>
        <ul>Description: {this.state.companyInfo.description}</ul>
        <ul>Exchange: {this.state.companyInfo.exchange}</ul>
      </li>
      </React.Fragment>
    )
  }
}

export default InfoCompany;

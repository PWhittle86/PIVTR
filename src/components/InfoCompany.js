import React from 'react';

class InfoCompany extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      companyInfo: {},
      companyNews: []
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log(prevProps.selectedStock.epic, this.props.selectedStock.epic);
    // debugger;
    if(prevProps.selectedStock.epic !== this.props.selectedStock.epic){
      const epic = this.props.selectedStock.epic

      fetch(`https://api.iextrading.com/1.0/stock/${epic}/news`)
      .then(response => response.json())
      .then(companyNews => this.setState({companyNews: companyNews}))
    }



    // fetch(`https://api.iextrading.com/1.0/stock/${epic}/company`)
    // .then(response => response.json())
    // .then(companyInfo => this.setState({companyInfo: companyInfo}))


  }

  render(){

    return(
      <React.Fragment>
      <ul className="companyInfo">
        <li>{this.state.companyInfo.companyName}</li>
        <li>Industry: {this.state.companyInfo.industry}</li>
        <li>Description: {this.state.companyInfo.description}</li>
        <li>Exchange: {this.state.companyInfo.exchange}</li>
        <li>{this.state.companyInfo.website}</li>
      </ul>
      </React.Fragment>
    )
  }
}

export default InfoCompany;
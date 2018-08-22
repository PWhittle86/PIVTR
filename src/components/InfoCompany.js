import React from 'react';

class InfoCompany extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      companyInfo: {},
      companyNews: [],
      companyLogo: ""
    }
  }

  componentDidUpdate(prevProps, prevState){

    if(prevProps.selectedStock.epic !== this.props.selectedStock.epic){
      const epic = this.props.selectedStock.epic

      fetch(`https://api.iextrading.com/1.0/stock/${epic}/company`)
      .then(response => response.json())
      .then(companyInfo => this.setState({companyInfo: companyInfo}))

      fetch(`https://api.iextrading.com/1.0/stock/${epic}/news`)
     .then(response => response.json())
     .then(companyNews => this.setState({companyNews: companyNews}))

     fetch(`https://api.iextrading.com/1.0/stock/${epic}/logo`)
    .then(response => response.json())
    .then(companyLogo => this.setState({companyLogo: companyLogo}))
    }
  }



  render(){

    const newsArticles = this.state.companyNews.map((newsItem, index) => {
      return(
        <section>
          <h3>{newsItem.headline}</h3>
          <p>{newsItem.summary}</p>
          <a href={newsItem.url}>Read on...</a>
        </section>
      )
    })

    return(
      <section className="companyInfo">
        <h2>{this.state.companyInfo.companyName}</h2>
        <img src={this.state.companyLogo.url}/>
        <p id= 'company-industry'>{this.state.companyInfo.industry}</p>
        <p>{this.state.companyInfo.description}</p>
        <a href={this.state.companyInfo.website}>{this.state.companyInfo.website}</a>
        <break/>
        {newsArticles}
      </section>
    )
  }
}

export default InfoCompany;

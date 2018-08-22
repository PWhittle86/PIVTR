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

    if(prevProps.selectedStock.epic !== this.props.selectedStock.epic){
      const epic = this.props.selectedStock.epic

      fetch(`https://api.iextrading.com/1.0/stock/${epic}/company`)
      .then(response => response.json())
      .then(companyInfo => this.setState({companyInfo: companyInfo}))
    }
  }



  render(){

    const newsArticles = this.state.companyNews.map((newsItem, index) => {
      return(
        <section>
          <h4>{newsItem.headline}</h4>
          <p>{newsItem.summary}</p>
          <a href={newsItem.url}>Read on...</a>
        </section>
      )
    })

    return(
      <section className="companyInfo">
        <h3>{this.state.companyInfo.companyName}</h3>
        <ul>
          <li>{this.state.companyInfo.industry}</li>
          <li>{this.state.companyInfo.description}</li>
          <li>{this.state.companyInfo.exchange}</li>
          <li>{this.state.companyInfo.website}</li>
        </ul>
        {newsArticles}
      </section>
    )
  }
}

export default InfoCompany;

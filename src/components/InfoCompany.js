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
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(prevProps.selectedStock.epic, this.props.selectedStock.epic);
    // debugger;
    if(prevProps.selectedStock.epic !== this.props.selectedStock.epic){
      const epic = this.props.selectedStock.epic

=======

    if(prevProps.selectedStock.epic !== this.props.selectedStock.epic){
      const epic = this.props.selectedStock.epic
>>>>>>> develop
      fetch(`https://api.iextrading.com/1.0/stock/${epic}/news`)
      .then(response => response.json())
      .then(companyNews => this.setState({companyNews: companyNews}))
    }

<<<<<<< HEAD


    // fetch(`https://api.iextrading.com/1.0/stock/${epic}/company`)
    // .then(response => response.json())
    // .then(companyInfo => this.setState({companyInfo: companyInfo}))


=======
    if(prevProps.selectedStock.epic !== this.props.selectedStock.epic){
      const epic = this.props.selectedStock.epic
=======


    if(prevProps.selectedStock.epic !== this.props.selectedStock.epic){
      const epic = this.props.selectedStock.epic
>>>>>>> ca21444165909a95eeb70a0190ec27a518161681

      fetch(`https://api.iextrading.com/1.0/stock/${epic}/company`)
      .then(response => response.json())
      .then(companyInfo => this.setState({companyInfo: companyInfo}))
    }
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> ca21444165909a95eeb70a0190ec27a518161681
  }

  render(){

<<<<<<< HEAD
<<<<<<< HEAD
    return(
      <React.Fragment>
=======
=======

>>>>>>> ca21444165909a95eeb70a0190ec27a518161681
    const newsArticles = this.state.companyNews.map((newsItem, index) => {
      return(
        <section>
        <h3>{newsItem.headline}</h3>
        <p>{newsItem.summary}</p>
        <p>Source: {newsItem.url}</p>
      </section>
      )
    })

    return(
      <section>
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> ca21444165909a95eeb70a0190ec27a518161681
      <ul className="companyInfo">
        <li>{this.state.companyInfo.companyName}</li>
        <li>Industry: {this.state.companyInfo.industry}</li>
        <li>Description: {this.state.companyInfo.description}</li>
        <li>Exchange: {this.state.companyInfo.exchange}</li>
        <li>{this.state.companyInfo.website}</li>
      </ul>
<<<<<<< HEAD
<<<<<<< HEAD
      </React.Fragment>
=======
      {newsArticles}
    </section>
>>>>>>> develop
=======

      {newsArticles}
    </section>

>>>>>>> ca21444165909a95eeb70a0190ec27a518161681
    )
  }
}

export default InfoCompany;

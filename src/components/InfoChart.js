import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

class InfoChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

componentDidMount(){
  // the url below needs to change based on user input
  // generateChart should send info to change the symbol below[ie aapl]
  const epic = this.props.selectedStock.epic
  fetch(`https://api.iextrading.com/1.0/stock/${epic}/chart/1m`)
  .then(response => response.json())
  .then(shares => {
    return shares.map((stock, index) => {
      return(
        {time: stock.label, price: stock.vwap}
      )
    })
  }).then(data => this.setState({data}))
}



render(){
return(
  <React.Fragment>
  <LineChart width={600} height={400} data={this.state.data}>
    <Line type="monotone" dataKey="price" stroke="#8884d8" />
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis/>
  </LineChart>
  </React.Fragment>
)}
}

// let data = [{name: 'entry1', uv: 1000}, {name: "entry2", uv: 800}, {name: "entry3", uv: 1200}]


export default InfoChart;

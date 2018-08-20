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
  //do a fetch request to get the stocks daily performance
  fetch(`https://api.iextrading.com/1.0/stock/aapl/chart/1m`)
  .then(response => response.json())
  .then(shares => {
    return shares.map((stock, index) => {
      return(
        {time: stock.label, price: stock.vwap}
      )
    })
      //a function that returns every share in the format {time: share.label, average: share.average})
  }).then(data => this.setState({data}))
}



render(){
return(
  <LineChart width={600} height={400} data={this.state.data}>
    <Line type="monotone" dataKey="price" stroke="#8884d8" />
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis/>
  </LineChart>
)}
}

// let data = [{name: 'entry1', uv: 1000}, {name: "entry2", uv: 800}, {name: "entry3", uv: 1200}]


export default InfoChart;

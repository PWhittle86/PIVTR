import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class InfoChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      time: "1m"
    }

  }

componentDidUpdate(){
  // the url below needs to change based on user input
  // generateChart should send info to change the symbol below[ie aapl]
  const epic = this.props.selectedStock.epic
  const time = this.state.time
  fetch(`https://api.iextrading.com/1.0/stock/${epic}/chart/${time}`)
  .then(response => response.json())
  .then(shares => {
    return shares.map((stock, index) => {
      return(
        {time: stock.label, price: stock.vwap}
      )
    })
  }).then(data => this.setState({data}))
}

changeTime = (time) => {
this.setState({time: time})
}


render(){
  const epicCAPS = this.props.selectedStock.epic.toUpperCase();
return(
  <React.Fragment>
    <div className="time-periods">
      <button onClick={()=>this.changeTime("1m")}>1M</button>
      <button onClick={()=>this.changeTime("3m")}>3M</button>
      <button onClick={()=>this.changeTime("6m")}>6M</button>
      <button onClick={()=>this.changeTime("1y")}>1Y</button>
      <button onClick={()=>this.changeTime("2y")}>2Y</button>
      <button onClick={()=>this.changeTime("5y")}>5Y</button>
    </div>
    <p>{epicCAPS}</p>
  <LineChart className="lineChart" width={600} height={400} data={this.state.data}>
    <Line type="monotone" dot={true} dataKey="price" stroke="#8884d8" strokeWidth={2} activeDot={{r: 6}} />
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis/>
    <Legend />
    <Tooltip/>
  </LineChart>
  </React.Fragment>
)}
}

// let data = [{name: 'entry1', uv: 1000}, {name: "entry2", uv: 800}, {name: "entry3", uv: 1200}]


export default InfoChart;

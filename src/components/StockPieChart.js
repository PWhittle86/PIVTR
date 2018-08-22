import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

class StockPieChart extends React.Component {


  colors = ['#D81159', '#FFBB28', '#0088FE', '#81C14B', '#FFA0FD', '#28AFB0', '#FF8042', '#593C8F', '#62BBC1', '#00C49F' ];

	render () {
    // FORMAT:
    // data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}];
    const data = this.props.portfolio.map(stock => {
      return {
        name: stock.name,
        value: stock.count
      }
    });

    const legendStyle = {
      top: 40,
      left: '460px',
      fontSize: '25px',
      overflow: 'auto',
      height: '400px'
    }

  	return (
    	<PieChart width={700} height={400}>
        <Legend layout="vertical" wrapperStyle={legendStyle}></Legend>
        <Pie
          data={data}
          cx={220}
          cy={200}
          labelLine={true}
          outerRadius={150}
          fill="#8884d8" label>
        	{	data.map((entry, index) => <Cell fill={this.colors[index]}/>) }
        </Pie>
      </PieChart>
    );
  }
}

export default StockPieChart;

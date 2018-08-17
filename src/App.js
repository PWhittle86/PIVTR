import React, { Component } from 'react';
import './App.css';
import StockContainer from './containers/StockContainer.js'


class App extends Component {
  render() {
    return (

      <React.Fragment>

      <div id="mission-statement">

        <p>At PIVTR we believe in one thing: optimising frictionless web-readiness. But what does that mean?</p>
        <p>It means we're a forward-thinking anti-conglomerate who work tirelessly to incubate cutting-edge paradigms and above all else: synergise backwards overflow.</p>
        <p>What this means for your personal portfolio is that you can be sure we won't just repurpose out-of-the-box methodologies. We'll evolve robust partnerships. Seize ubiquitous communities. We will <i>innovate transparent e-tailers.</i></p>
        <p>So don't stick in the mud of the beaten path you've walked before. Don't be a limiter. Be a <b>PIVTR</b>.</p>
      </div>


      <div>
          <StockContainer />
      </div>
    </React.Fragment>
    )
  }
}

export default App;

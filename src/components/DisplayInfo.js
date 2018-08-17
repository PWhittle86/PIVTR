import React from 'react';

const DisplayInfo = (props) => {

  const createStock = () => {
    const stock = {
      name: props.quote.companyName,
      epic: props.quote.symbol,
      price: props.quote.latestPrice,
      change: props.quote.change,
      time: Date.now()
    }
    saveStock(stock);
  }

  const saveStock = (stock) => {
    fetch(`http://localhost:3001/stocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(stock)
    }).then(response => response.json()).then(response => console.log(response));
  }

  return(
    <React.Fragment>
      <p>{props.quote.companyName}</p>
      <button onClick={createStock}>buy</button>
    </React.Fragment>
  )

}

export default DisplayInfo;

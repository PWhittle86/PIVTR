import React from 'react';

class NotificationBox extends React.Component {

  state = {
    notificationMessages: [],
    latestPrices: {},
    timer: undefined
  }


  // latestPrices : {
  //   DBX: 153,
  //   AAPL: 67.0
  // } //

  componentDidUpdate = (prevProps) => {
    if(Object.keys(this.props.favStocks).length !== Object.keys(prevProps.favStocks).length) {
      this.updateLatestPrices();
     // sets value of timer to return value of scheduledNotifications
    this.setState({ timer : this.scheduledNotifications() })
  }
  }

  updateLatestPrices = () => {
    this.props.favStocks.map(stock => this.setState(prevState => ({
        latestPrices : {
          ...prevState.latestPrices, // copies the values of latestPrices from previous state
          [stock.epic]: stock.avgPrice
        }
      })));
  }

  componentWillUnmount = () => {
    clearInterval(this.state.timer);
  }

  scheduledNotifications = () => {
    return setInterval(() => {
        this.props.favStocks.forEach(stock => {
          fetch(`https://api.iextrading.com/1.0/stock/${stock.epic}/quote`)
          .then(response => response.json())
          .then(response => {
            // console.log(response.latestPrice, this.state.latestPrices[stock.epic]);
            if(response.latestPrice > this.state.latestPrices[stock.epic]) {
              this.props.incrementNotificationCount();
              const message = this.buildNotificationMessage(response, this.state, stock);
              this.setState(prevState => ({
                notificationMessages: [...this.state.notificationMessages, message],
                latestPrices: {
                  ...prevState.latestPrices,
                  [stock.epic]: response.latestPrice
                }
              }));
            }
          }).catch(error => console.log(error));
        })
    }, 10000);
  }

  buildNotificationMessage = (response, state, stock) => {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let time = hours + ":" + minutes + ":" + seconds
    console.log(time);
    return (
      <section className="notification-element">
        <p>{time}</p>
        {stock.name} increased by $ <b>{(response.latestPrice - state.latestPrices[stock.epic]).toFixed(3)}</b>
      </section>
    )
  }

  render(){
    // stores this.state.notificationMessages in a variable (deconstructing)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { notificationMessages } = this.state;
    return(
        <section id="notification-box">
          { notificationMessages.map(message => message)}
        </section>
    )
  }
}

export default NotificationBox;

import React from 'react';

class Notification extends React.Component {
  render(){
    // stores this.state.notificationMessages in a variable (deconstructing)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { notificationMessages } = this.state;
    return(
        <section>
          { notificationMessages.map(message => <p> {message} </p>)}
        </section>
    )
  }
}

export default Notification;

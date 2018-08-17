import React, {Component} from 'react';

class Deck extends Component{

  constructor(props){
    super(props);
    this.state = {
      cards: []
    }
  }

render(){
  return(
    <p>This is a Deck.</p>
  )
}

}

export default Deck;

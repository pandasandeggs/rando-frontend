import React, { Component } from 'react';
import '../App.css';
import NavBar from './NavBar'

class Home extends Component {

  state = {
    currentUser: this.props.currentUser
  }

  handleHungryClick = () => {
    this.props.randomRestaurant()
  }

  handleBoredClick = () => {
    this.props.randomActivity()
  }

  handleRestaurantClick = () => {
    this.props.restaurantList()
  }

  render() {
    return (
    <div>
      <h1>Hello { this.state.currentUser.name }!</h1>
      <h3>I'm Rando! I'm here to help!</h3>
      <img src="https://pbs.twimg.com/profile_images/378800000099889392/c47f40d0fb1549ed31443ebef54f31e8_400x400.png" height="200" width="200" alt="Bark Bark"></img>
      <p>How are you?</p>
      <div>
        <button onClick={ () => this.handleHungryClick() }>Im hungry</button>
        <button>Eat with Friends</button>
      </div>
        <br/>
      <div>
      </div>
    </div>
    );
  }
}

export default Home;

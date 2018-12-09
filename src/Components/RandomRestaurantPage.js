import React, { Component } from 'react';
import '../App.css';

class RandomRestaurantPage extends Component {

  render() {
    return (
      <div>
        <h1>Try eating here:</h1>
        <h3><a href={this.props.randomRestaurant.url}>{this.props.randomRestaurant.name}</a></h3>
        <img src="https://pbs.twimg.com/profile_images/378800000099889392/c47f40d0fb1549ed31443ebef54f31e8_400x400.png" height="200" width="200" alt="Bark Bark"></img>
      </div>
    );
  }
}

export default RandomRestaurantPage;

import React, { Component } from 'react';
import '../App.css';
import NavBar from './NavBar'

class RestaurantList extends Component{

  getUserRestaurants = props => {
    return this.props.currentUser.restaurants.map(restaurant =>
      <li key={restaurant.id}><a href="#" >{restaurant.name}</a></li>
    )
  }


  render(){
    return(
      <div>
        {this.getUserRestaurants()}
        <br/>
      </div>
    )
  }
}

export default RestaurantList;

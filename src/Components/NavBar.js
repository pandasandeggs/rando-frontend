import React, { Component } from 'react';
import '../App.css';

class NavBar extends Component{

  handleHomeClick = () => {
    this.props.getHome()
  }

  handleProfileClick = () => {

  }

  handleRestaurantClick = () => {
    this.props.getRestaurantList()
  }

  handleFriendsClick = () => {

  }

  handleLogout = () => {
    this.props.logout()
  }

  render(){
    return(
      <div>
        <button onClick={ () => this.handleHomeClick() }>Home</button>
        <button onClick={ () => this.handleProfileClick() }>Profile</button>
        <button onClick={ () => this.handleRestaurantClick() }>Restaurants</button>
        <button onClick={ () => this.handleFriendClick() }>Friends</button>
        <button onClick={ () => this.handleLogout() }>Logout</button>
      </div>
    )
  }
}

export default NavBar;

/* Remember to add friends options on this page. */
import React, { Component } from 'react';
import '../App.css';
import NavBar from './NavBar'

class Profile extends Component {

  render() {
    return (
    <div>
      <h1>My Profile</h1>
      <br/>
        <h2>Name:</h2>
          <p>{this.props.currentUser.name}</p>
      <br/>
        <h2>Username:</h2>
          <p>{this.props.currentUser.username}</p>
      <br/>
        <h2>Friends:</h2>
          <ul>{this.props.currentUser.friends.map(friend => {
            return <li key={friend.id}><a>{friend.username}</a></li> })
            }
          </ul>
      <br/>
        <button>Edit Profile</button>
    </div>
    );
  }
}

export default Profile;

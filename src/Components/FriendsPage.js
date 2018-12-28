import React, { Component } from 'react';
import '../App.css';

class FriendsPage extends Component {

  render() {
    return (
      <div>
        <form>
          <input type="text" name="Search" placeholder="Search for friends"/>
          <input type="submit" value="Search"/>
        </form>
        <h1>My Friends</h1>
        <ul>
          {this.props.currentUser.friends.map( friend => { return <li key={friend.id}>{friend.username}</li>})}
        </ul>
      </div>
    );
  }
}

export default FriendsPage;

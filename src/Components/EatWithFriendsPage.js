import React, { Component } from 'react';
import '../App.css';

class EatWithFriendsPage extends Component {

  render() {
    return (
      <div>
        <h1> Who do you want to eat with? </h1>
          <form>
            {this.props.currentUser.friends.map( friend => {
                return <label key={friend.id}>
                <input type="checkbox" input={friend.username} />
                {friend.username}
                </label>
              })
            }
          </form>
      </div>
    );
  }
}

export default EatWithFriendsPage;

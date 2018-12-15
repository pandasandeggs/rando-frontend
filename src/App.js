import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import RandomRestaurantPage from './Components/RandomRestaurantPage'
import RandomActivityPage from './Components/RandomActivityPage'

class App extends Component {

  constructor(){
    super();
    this.state = {
      currentUser: null,
      restaurants: [],
      activities: [],
      friends: [],
      showSignup: localStorage.token ? false : true,
      showLogin: localStorage.token ? false : true,
      showHome: localStorage.token ? true : false,
      showRestaurantPage: false,
      showActivityPage: false,
      currentRestaurant: null
    }
  }

  componentDidMount(){
    const token = localStorage.token
    if(token){
      fetch('http://localhost:3000/api/v1/profile', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(data => {
          if(!data.error){
            this.setState({
              currentUser: data.user,
              showSignup: false,
              showLogin: false
            })
          } else {
            alert("There was an error in the profile!")
          }
        })
    }
  }

  signup = (name, username, password, confirmation) => {
    localStorage.clear()
    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
        password_confirmation: confirmation
      })
    }).then(resp => resp.json())
      .then(data => {
        if(!data.error){
          localStorage.setItem('token', data.jwt);
          this.setState({
            currentUser: data.user,
            showSignup: false,
            showHome: true
          })
        } else {
          alert("User information invalid. Please try again.")
        }
      })
  }

  login = (username, password) => {
    localStorage.clear()
    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(resp => resp.json())
      .then(data => {
        if(!data.error){
          localStorage.setItem('token', data.jwt);
          this.setState({
            currentUser: data.user,
            showLogin: false,
            showHome: true
          })
        } else {
          alert("Username and/or password are invalid. Please try again.")
        }
      })
  }

/* Grabs a random restaurant for the user from their list of restaurants */
  getRandomRestaurant = () => {
    console.log("I hit the get random restaurant function")
    const token = localStorage.token
    if(token){
      fetch('http://localhost:3000/api/v1/restaurants/random', {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(data => {
          if(!data.error){
            this.setState({
              currentRestaurant: data,
              showRestaurantPage: true,
              showHome: false
            })
          }
        })
    } else {
      console.log("Need to login.")
    }
  }

  getRandomActivity = () => {

  }
/* Directs user to the correct page */
  currentPage = () => {
    const { currentUser, restaurants, activities, friends, showSignup, showLogin, showHome, showRestaurantPage, showActivityPage, currentRestaurant } = this.state;
    if(showSignup === true){
      return <Signup currentUser={currentUser} signup={this.signup} getLogin={this.getLogin}/>
    } else if(showLogin === true){
      return <Login currentUser={currentUser} login={this.login} getSignup={this.getSignup}/>
    } else if(showHome === true){
      return <Home currentUser={currentUser} randomRestaurant={this.getRandomRestaurant} randomActivity={this.getRandomActivity}/>
    } else if(showRestaurantPage === true){
      return <RandomRestaurantPage currentUser={currentUser} restaurants={restaurants} currentRestaurant={currentRestaurant}/>
    } else if(showActivityPage === true){
      return <RandomActivityPage currentUser={currentUser} activities={activities}/>
    }
  }

  getSignup = () => {
    this.setState({
      showSignup: true,
      showLogin: false,
      showHome: false
    })
  }

  getLogin = () => {
    this.setState({
      showSignup: false,
      showLogin: true,
      showHome: false
    })
  }

  render() {
    const { currentUser, restaurants, activities, friends, showSignup, showLogin, showHome } = this.state;
    return (
      <div>
        { this.currentPage() }
      </div>
    )
  }
}

export default App;

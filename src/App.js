import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import RandomRestaurantPage from './Components/RandomRestaurantPage'
import RestaurantList from './Components/RestaurantList'
import NavBar from './Components/NavBar'
import Profile from './Components/Profile'
import FriendsPage from './Components/FriendsPage'
import EatWithFriendsPage from './Components/EatWithFriendsPage'

class App extends Component {

  constructor(){
    super();
    this.state = {
      currentUser: null,
      restaurants: [],
      friends: [],
      showSignup: localStorage.token ? false : true,
      showLogin: localStorage.token ? false : true,
      showHome: localStorage.token ? true : false,
      showRestaurantPage: false,
      showRestaurantList: false,
      showProfile: false,
      showFriendsPage: false,
      showEatWithFriendsPage: false,
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
    const { currentUser, restaurants, friends, showSignup, showLogin, showHome, showRestaurantPage, showRestaurantList, currentRestaurant, showProfile, showFriendsPage, showEatWithFriendsPage } = this.state;
    if(showSignup === true){
      return <Signup currentUser={currentUser} signup={this.signup} getLogin={this.getLogin}/>
    } else if(showLogin === true){
      return <Login currentUser={currentUser} login={this.login} getSignup={this.getSignup}/>
    } else if(showHome === true){
      return <div><Home currentUser={currentUser} randomRestaurant={this.getRandomRestaurant} getEatWithFriendsPage={this.getEatWithFriendsPage}/><NavBar getHome={this.getHome} getRestaurantList={this.getRestaurantList} getProfile={this.getProfile} getFriendsPage={this.getFriendsPage} logout={this.logout}/></div>
    } else if(showRestaurantPage === true){
      return <div><RandomRestaurantPage currentUser={currentUser} restaurants={restaurants} currentRestaurant={currentRestaurant} getHome={this.getHome} randomRestaurant={this.getRandomRestaurant}/><NavBar getHome={this.getHome} getRestaurantList={this.getRestaurantList} getProfile={this.getProfile} getFriendsPage={this.getFriendsPage} logout={this.logout}/></div>
    } else if(showRestaurantList === true){
      return <div><RestaurantList currentUser={currentUser} getHome={this.getHome}/><NavBar getHome={this.getHome} getRestaurantList={this.getRestaurantList} getProfile={this.getProfile} getFriendsPage={this.getFriendsPage} logout={this.logout}/></div>
    } else if(showProfile === true){
      return <div><Profile currentUser={currentUser} getHome={this.getHome}/><NavBar getHome={this.getHome} getRestaurantList={this.getRestaurantList} getProfile={this.getProfile} getFriendsPage={this.getFriendsPage} logout={this.logout}/></div>
    } else if(showFriendsPage === true){
      return <div><FriendsPage currentUser={currentUser} getHome={this.getHome}/><NavBar getHome={this.getHome} getRestaurantList={this.getRestaurantList} getProfile={this.getProfile} getFriendsPage={this.getFriendsPage} logout={this.logout}/></div>
    } else if(showEatWithFriendsPage === true){
      return <div><EatWithFriendsPage currentUser={currentUser} getHome={this.getHome}/><NavBar getHome={this.getHome} getRestaurantList={this.getRestaurantList} getProfile={this.getProfile} getFriendsPage={this.getFriendsPage} logout={this.logout}/></div>
    }
  }
/* Page Switching Functions */
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

  getHome = () => {
    this.setState({
      showRestaurantPage: false,
      showRestaurantList: false,
      showProfile: false,
      showFriendsPage: false,
      showEatWithFriendsPage: false,
      showHome: true
    })
  }

  getRestaurantList = () => {
    this.setState({
      showRestaurantPage: false,
      showRestaurantList: true,
      showProfile: false,
      showFriendsPage: false,
      showEatWithFriendsPage: false,
      showHome: false
    })
  }

  getProfile = () => {
    this.setState({
      showRestaurantPage: false,
      showRestaurantList: false,
      showProfile: true,
      showFriendsPage: false,
      showEatWithFriendsPage: false,
      showHome: false
    })
  }

  getFriendsPage = () => {
    this.setState({
      showRestaurantPage: false,
      showRestaurantList: false,
      showProfile: false,
      showFriendsPage: true,
      showEatWithFriendsPage: false,
      showHome: false
    })
  }

  getEatWithFriendsPage = () => {
    this.setState({
      showRestaurantPage: false,
      showRestaurantList: false,
      showProfile: false,
      showFriendsPage: false,
      showEatWithFriendsPage: true,
      showHome: false
    })
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      showSignup: true,
      showLogin: false,
      showRestaurantPage: false,
      showRestaurantList: false,
      showProfile: false,
      showFriendsPage: false,
      showEatWithFriendsPage: false,
      showHome: false
    })
  }

  render() {
    return (
      <div>
        { this.currentPage() }
      </div>
    )
  }
}

export default App;

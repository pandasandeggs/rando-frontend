import React, { Component } from 'react';

class Signup extends Component {

  constructor(){
    super();
    this.state = {
      name: '',
      username: '',
      password: '',
      confirmation: '',
    }
  }

  handleNameChange = e => this.setState({name: e.target.value})

  handleUsernameChange = e => this.setState({username: e.target.value})

  handlePasswordChange = e => this.setState({password: e.target.value})

  handleConfirmationChange = e => this.setState({confirmation: e.target.value})

  handleSubmit = e => {
    e.preventDefault();
    this.props.signup(this.state.name, this.state.username, this.state.password, this.state.confirmation)
  }


  render(){
    const { name, username, password, confirmation } = this.state;

    return (
      <div>
        <h1>Rando!</h1>
          <br/>
        <h2>Sign Up</h2>

        <form onSubmit={this.handleSubmit} >
          <div>
            <label><h4>
              Name
            </h4></label>
            <input type="text" value={name} onChange={this.handleNameChange}/>
          </div>

          <div>
            <label><h4>
              Username
            </h4></label>
            <input type="text" value={username} onChange={this.handleUsernameChange}/>
          </div>

          <div>
            <label><h4>
              Create Password
            </h4></label>
            <input type="password" value={password} onChange={this.handlePasswordChange}/>
          </div>

          <div>
            <label><h4>
              Confirm Password
            </h4></label>
            <input type="password" value={confirmation} onChange={this.handleConfirmationChange}/>
          </div>
          <br/>
          <button type="submit" className="button">Sign Up</button>
        </form><br/>

          <button onClick={ () => this.props.getLogin() }>Login Here</button>

      </div>


    )
  }

}

export default Signup;

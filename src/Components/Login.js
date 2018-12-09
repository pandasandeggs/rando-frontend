import React, { Component } from 'react';

class Login extends Component {

  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsernameChange = e => this.setState({username: e.target.value})

  handlePasswordChange = e => this.setState({password: e.target.value})

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password)
  }


  render(){
    const { username, password } = this.state;

    return (
      <div>
        <h1>Rando!</h1>
          <br/>
        <h2>Login</h2>

        <form onSubmit={this.handleSubmit} >
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
          <br/>

          <button type="submit">Login</button>
        </form><br/>

          <button onClick={ () => this.props.getSignup() }>Sign Up Here</button>

      </div>


    )
  }

}

export default Login;

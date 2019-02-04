import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log("submit login")
  }

  render() {
    return (
      <>
      <h2>Login</h2>
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" value={this.state.username} placeholder="Enter Username" onChange={this.handleChange}/>
        <input type="password" name="password" value={this.state.password} placeholder="Enter Password" onChange={this.handleChange}/>
        <button type="submit">Submit</button>
      </form>
      </>
    );
  }

}

export default Login;

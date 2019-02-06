import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      this.props.loginUser(data)
    })
  }

  render() {
    return (
      <div className="col-12">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="username-input">Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Enter Username"
                onChange={this.handleChange}
                id="username-input"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="password-input">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Enter Password"
                onChange={this.handleChange}
                id="password-input"
                className="form-control"
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (userData) => dispatch({type: "LOGIN_USER", payload: userData})
  }
}

export default connect(null, mapDispatchToProps)(Login)

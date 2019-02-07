import React, { Component } from 'react';
import { connect } from 'react-redux'

class Signup extends Component {
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
    console.log("signup")
    fetch("http://localhost:4000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      this.props.loginUser(data)
    })
  }

  handleSwitch = e => {
    e.preventDefault()
    this.props.setHomeFormType()
  }

  render() {
    return (
      <>
      <div className="col-12">
        <h2>Signup</h2>
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
          <button className="btn btn-primary" type="submit">Signup</button>
        </form>
      </div>
      <div className="col-12">
        <button onClick={this.handleSwitch} className="btn btn-link">Login</button>
      </div>
      </>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return{
    loginUser: (userData) => dispatch({type: "LOGIN_USER", payload: userData}),
    setHomeFormType: () => dispatch({type: "SET_HOME_FORM_TYPE", payload: "login"})
  }
}

export default connect(null, mapDispatchToProps)(Signup)

import React, { Component } from 'react';
import { connect } from 'react-redux'
import Loader from './Loader'

class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    this.setState({
      loading: true
    })

    e.preventDefault()
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username.trim(),
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("logged in")
      this.props.loginUser(data)
    })
  }

  handleSwitch = e => {
    e.preventDefault()
    this.props.setHomeFormType()
  }

  handleClick = () => {
    this.setState({
      loading: true
    })
  }

  render() {
    return (
      <>
      <div className="col-12">
        <h2 className="rainbow-border">Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group col-12">
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
            <div className="form-group col-12">
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
          {this.state.loading ? <Loader /> : <button className="btn btn-blue" type="submit">Login</button> }

        </form>
      </div>
      <div className="col-12">
        <button onClick={this.handleSwitch} className="btn btn-link">Signup</button>
      </div>
      </>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (userData) => dispatch({type: "LOGIN_USER", payload: userData}),
    setHomeFormType: () => dispatch({type: "SET_HOME_FORM_TYPE", payload: "signup"})
  }
}

export default connect(null, mapDispatchToProps)(Login)

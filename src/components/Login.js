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

      if (Object.keys(data).includes("error")) {
        this.setState({
          loading: false
        })
        this.props.handleLoginError(data)
      } else {
        console.log("logged in")
        this.props.loginUser(data)
      }

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
              {this.props.errors && this.props.errors.type === "username" ? <p className="error">{this.props.errors.error}</p> : null}
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
              {this.props.errors && this.props.errors.type === "password" ? <p className="error">{this.props.errors.error}</p> : null}
            </div>
          </div>

          {this.state.loading ? <Loader /> :
            <>
              <button className="btn btn-primary" type="submit">Login</button>
              <button onClick={this.handleSwitch} className="btn btn-link">Signup</button>
            </>
          }

        </form>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (userData) => dispatch({type: "LOGIN_USER", payload: userData}),
    setHomeFormType: () => dispatch({type: "SET_HOME_FORM_TYPE", payload: "signup"}),
    handleLoginError: error => dispatch({type: "HANDLE_LOGIN_ERROR", payload: error})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

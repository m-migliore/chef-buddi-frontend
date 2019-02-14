import React, { Component } from 'react';
import { connect } from 'react-redux'
import Loader from './Loader'

class Signup extends Component {
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
      console.log(data)
      if (Object.keys(data).includes("errors")) {
        this.setState({
          loading: false
        })
        console.log("errors:", data.errors)
        this.props.handleErrors(data.errors)
      } else {
        this.props.loginUser(data)
      }
    })
  }

  handleSwitch = e => {
    e.preventDefault()
    this.props.setHomeFormType()
  }

  render() {
    return (
      <div className="col-12 animated 1s fadeIn">
        <h2 className="rainbow-border">Signup</h2>
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
              {this.props.errors && this.props.errors.username ? <p className="error">Username {this.props.errors.username}</p> : null}
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
              {this.props.errors && this.props.errors.password ? <p className="error">Password {this.props.errors.username}</p> : null}
            </div>
          </div>

          {this.state.loading ? <Loader /> :
            <>
              <button className="btn btn-primary" type="submit">Signup</button>
              <button onClick={this.handleSwitch} className="btn btn-link">Login</button>
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
  return{
    loginUser: (userData) => dispatch({type: "LOGIN_USER", payload: userData}),
    setHomeFormType: () => dispatch({type: "SET_HOME_FORM_TYPE", payload: "login"}),
    handleErrors: errors => dispatch({type: "HANDLE_ERRORS", payload: errors})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

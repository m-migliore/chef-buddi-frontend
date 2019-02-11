import React, { Component } from 'react';
import { connect } from 'react-redux'
import Login from '../components/Login'
import Signup from '../components/Signup'

class Home extends Component {
  handleClick = e => {
    this.props.setHomeFormType(e.target.name)
  }

  render() {
    return (
      <div className="homepage">
        {this.props.homeFormType ?
          <div className="container">
            <div className="row">
              <div className="home-form">
                {this.props.homeFormType === "login" ? <Login /> : <Signup />}
              </div>
            </div>
          </div>
        :
          <div className="container prompts">
            <div className="row">
              <div className="col-12 welcome">
                <h2>Welcome To Chef Buddi</h2>
                <h4>An Interactive Kitchen Manager</h4>
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary" name="login" onClick={this.handleClick}>Login</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary" name="signup" onClick={this.handleClick}>Signup</button>
              </div>
            </div>
          </div>}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    homeFormType: state.homeFormType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setHomeFormType: (formType) => dispatch({type: "SET_HOME_FORM_TYPE", payload: formType})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

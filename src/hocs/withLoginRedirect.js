import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function withLoginRedirect(WrappedComponent) {
  return class loginCheck extends Component {
    render() {
      return (
        <>
          {this.props.currentUserId ? <WrappedComponent {...this.props} /> : <Redirect to="/" />}
        </>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId
  }
}

// const loginCheckWrap = () => connect(mapStateToProps)(withLoginRedirect)

export default connect(mapStateToProps)(withLoginRedirect)

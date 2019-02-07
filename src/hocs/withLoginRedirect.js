import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function loginRedirect(WrappedComponent) {
  return class loginCheck extends Component {
    render() {
      return (
        <>
          {this.props.currentUserId ? <WrappedComponent  /> : <Redirect to="/" />}
        </>
      )
    }
  }
}

mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId
  }
}

export default connect(mapStateToProps)(loginRedirect)

import React, { Component } from 'react';
import { connect } from 'react-redux'

class Profile extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/users/${this.props.currentUserId}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        user: data
      })
    })
  }

  render() {
    return (
      <div>
        <h2>Profile Page of User#: {this.state.user.id}</h2>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId
  }
}

export default connect(mapStateToProps)(Profile)

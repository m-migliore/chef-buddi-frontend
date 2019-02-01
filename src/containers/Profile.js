import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from './IngredientContainer'
import ingredSelector from '../hocs/ingredSelector'

class Profile extends Component {

  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/users/3`)
    .then(res => res.json())
    .then(data => {
      this.props.setUser(data)
    })
  }

  render() {
    const UserIngredientContainer = ingredSelector(IngredientContainer, this.props.currentUser.ingredients)

    return (
      <div>
        <h2>Profile Page of User#: {this.props.currentUser.id}</h2>
        {this.props.currentUser.ingredients? <h3>User Ingredients</h3> : <h3>No Ingredient Found</h3>}
        {this.props.currentUser.ingredients ? <UserIngredientContainer /> : null}
      </div>
    );
  }

}

const mapStateToProps = state => {
  console.log(state.currentUser)
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (userData) => dispatch({type: "SET_CURRENT_USER", payload: userData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

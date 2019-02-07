import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import IngredientContainer from './IngredientContainer'
import RecipeContainer from './RecipeContainer'
import withLoginRedirect from '../hocs/withLoginRedirect'

class Profile extends Component {

  componentDidMount() {
    if (this.props.currentUserId) {
      fetch(`http://localhost:4000/api/v1/users/${this.props.currentUserId}`)
      .then(res => res.json())
      .then(data => {
        console.log("logged in")
        this.props.setUser(data)
      })
    }
  }

  // loginRedirect = () => {
  //   if (this.props.currentUserId === null) {
  //     return <Redirect to="/" />
  //   }
  // }

  render() {

    return (
      <div>
        {/* {this.loginRedirect()} */}

        <h2>Profile Page for User: {this.props.currentUser.username}</h2>
        {this.props.currentUser.ingredients? <h3>User Ingredients</h3> : <h3>No Ingredients Found</h3>}
        {this.props.currentUser.ingredients ? <IngredientContainer ingredients={this.props.currentUser.ingredients}/> : null}
        {this.props.currentUser.recipes ? <h3>User Recipes</h3> : <h3>No Recipes Found</h3>}
        {this.props.currentUser.recipes ? <RecipeContainer recipes={this.props.userRecipes} /> : null}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    currentUser: state.currentUser,
    userRecipes: state.userRecipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (userData) => dispatch({type: "SET_CURRENT_USER", payload: userData}),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withLoginRedirect(Profile))

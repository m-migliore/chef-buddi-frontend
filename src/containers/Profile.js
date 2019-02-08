import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import IngredientContainer from './IngredientContainer'
import RecipeContainer from './RecipeContainer'

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

  loginRedirect = () => {
    if (this.props.currentUserId === null) {
      return <Redirect to="/" />
    }
  }

  handleClick = () => {

  }

  render() {
    // const UserIngredientContainer = ingredListSelector(IngredientContainer, this.props.currentUser.ingredients)
    // const UserRecipeContainer = recipeListSelector(RecipeContainer, this.props.currentUser.recipes)
    return (
      <div className="profile">
        {this.loginRedirect()}

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Profile Page for User: {this.props.currentUser.username}</h2>
            </div>
            <div className="col-12">
              <Link to="/create-mealplan" className="btn btn-primary">Create Mealplan</Link>
            </div>
          </div>
        </div>

        {this.props.currentUser.ingredients? <h3>User Ingredients</h3> : <h3>No Ingredients Found</h3>}
        {/* {this.props.currentUser.ingredients ? <UserIngredientContainer /> : null} */}
        {this.props.currentUser.ingredients ? <IngredientContainer ingredients={this.props.currentUser.ingredients}/> : null}
        {this.props.currentUser.recipes ? <h3>User Recipes</h3> : <h3>No Recipes Found</h3>}
        {/* {this.props.currentUser.recipes ? <UserRecipeContainer /> : null} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

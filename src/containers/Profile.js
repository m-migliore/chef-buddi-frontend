import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from './IngredientContainer'
// import ingredListSelector from '../hocs/ingredListSelector'
import RecipeContainer from './RecipeContainer'
// import recipeListSelector from '../hocs/recipeListSelector'

class Profile extends Component {

  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/users/3`)
    .then(res => res.json())
    .then(data => {
      this.props.setUser(data)
    })
  }

  render() {
    // const UserIngredientContainer = ingredListSelector(IngredientContainer, this.props.currentUser.ingredients)
    // const UserRecipeContainer = recipeListSelector(RecipeContainer, this.props.currentUser.recipes)

    return (
      <div>
        <h2>Profile Page of User#: {this.props.currentUser.id}</h2>
        {this.props.currentUser.ingredients? <h3>User Ingredients</h3> : <h3>No Ingredients Found</h3>}
        {/* {this.props.currentUser.ingredients ? <UserIngredientContainer /> : null} */}
        {this.props.currentUser.ingredients ? <IngredientContainer ingredients={this.props.currentUser.ingredients}/> : null}
        {this.props.currentUser.recipes ? <h3>User Recipes</h3> : <h3>No Recipes Found</h3>}
        {/* {this.props.currentUser.recipes ? <UserRecipeContainer /> : null} */}
        {this.props.currentUser.recipes ? <RecipeContainer recipes={this.props.currentUser.recipes} /> : null}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (userData) => dispatch({type: "SET_CURRENT_USER", payload: userData}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

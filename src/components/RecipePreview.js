import React, { Component } from 'react';
import { connect } from 'react-redux'

class RecipePreview extends Component {
  handleClick = () => {
    if (window.location.pathname === "/profile") {
      this.props.setViewUserRecipeId(this.props.recipe['recipe_id'], this.props.recipe.id)
    } else {
      this.props.setViewRecipeId(this.props.recipe.id)
    }
  }

  render() {
    const recipe = this.props.recipe
    return (
      <div className="recipe-preview col-md-4" onClick={this.handleClick}>
        <h4>{recipe.name}</h4>
        <img src={recipe.image} alt={recipe.name}/>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    setViewRecipeId: (recipeId) => dispatch({type: "SET_VIEW_RECIPE_ID", payload: recipeId}),
    setViewUserRecipeId: (recipeId, userRecipeId) => dispatch({type: "SET_VIEW_USER_RECIPE_ID", payload: {recipeId, userRecipeId}})
  }
}

export default connect(null, mapDispatchToProps)(RecipePreview)

import React, { Component } from 'react';
import { connect } from 'react-redux'

class RecipePreview extends Component {
  handleClick = () => {
    this.props.setViewRecipeId(this.props.recipe.id)
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
    setViewRecipeId: (recipeId) => dispatch({type: "SET_VIEW_RECIPE_ID", payload: recipeId})
  }
}

export default connect(null, mapDispatchToProps)(RecipePreview)

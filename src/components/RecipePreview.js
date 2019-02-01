import React, { Component } from 'react';
import { connect } from 'react-redux'

class RecipePreview extends Component {
  handleClick = () => {
    this.props.viewRecipe(this.props.recipe.id)
  }

  render() {
    const recipe = this.props.recipe
    return (
      <div className="recipe-preview" onClick={this.handleClick}>
        <h3>{recipe.name}</h3>
        <img src={recipe.image} alt={recipe.name}/>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    viewRecipe: (recipeId) => dispatch({type: "VIEW_RECIPE", payload: recipeId})
  }
}

export default connect(null, mapDispatchToProps)(RecipePreview)

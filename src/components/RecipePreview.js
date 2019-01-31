import React, { Component } from 'react';

class RecipePreview extends Component {

  render() {
    const recipe = this.props.recipe
    return (
      <div className="recipe-preview">
        <h3>{recipe.name}</h3>
        <img src={recipe.image} alt={recipe.name}/>
      </div>
    );
  }

}

export default RecipePreview;

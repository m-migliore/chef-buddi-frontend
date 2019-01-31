import React, { Component } from 'react';

class RecipeView extends Component {
  state = {
    recipe: {}
  }

  componentDidMount() {
    fetch("http://localhost:4000/api/v1/recipes/638")
    .then(res => res.json())
    .then(data => {
      this.setState({
        recipe: data
      })
    })
  }

  render() {
    const recipe = this.state.recipe
    return (
      <div className="recipe-view">
        <div className="recipeInfo">
          <h2>{recipe.name}</h2>
          <h4>Category: <span>{recipe.category}</span></h4>
          <h4>Area: <span>{recipe.area}</span></h4>
          {/* <ul>
            {recipe.tags.split(",").map(tag => <li>{tag}</li>)}
          </ul> */}
          <h4>Tags: {recipe.tags}</h4>
          <h4><a href={recipe.youtube} target="_blank">View on YouTube</a></h4>
          <h4><a href={recipe.source} target="_blank">Source</a></h4>
        </div>
        <img src={recipe.image} alt={recipe.name}/>
      </div>
    );
  }

}

export default RecipeView;

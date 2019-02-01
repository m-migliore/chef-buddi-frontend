import React, { Component } from 'react';
import { connect } from 'react-redux'

class RecipeView extends Component {
  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/recipes/${this.props.viewedRecipeId}`)
    .then(res => res.json())
    .then(data => {
      this.props.setViewRecipe(data)
    })
  }

  backButtonClick = () => {
    this.props.clearViewRecipeId()
  }

  render() {
    // const recipe = this.props.viewedRecipe
    let recipe

    this.props.viewedRecipe ? recipe = this.props.viewedRecipe : recipe = {}

    return (
      <div className="recipe-view">
        <button onClick={this.backButtonClick}>Back To Recipe List</button>
        <div className="recipeInfo">
          <h2>{recipe.name}</h2>
          <h4>Category: <span>{recipe.category}</span></h4>
          <h4>Area: <span>{recipe.area}</span></h4>
          {/* <ul>
            {recipe.tags.split(",").map(tag => <li>{tag}</li>)}
          </ul> */}
          {recipe.tags ? <h4>Tags: {recipe.tags}</h4> : null}
          <h4><a href={recipe.youtube} target="_blank" rel="noopener noreferrer">View on YouTube</a></h4>
          <h4><a href={recipe.source} target="_blank" rel="noopener noreferrer">Source</a></h4>
        </div>
        <img src={recipe.image} alt={recipe.name}/>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    viewedRecipeId: state.viewedRecipeId,
    viewedRecipe: state.viewedRecipe
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setViewRecipe: (recipe) => dispatch({type: "SET_VIEW_RECIPE", payload: recipe}),
    clearViewRecipeId: () => dispatch({type: "CLEAR_VIEW_RECIPE_ID"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeView)

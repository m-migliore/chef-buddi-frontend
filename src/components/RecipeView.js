import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
import ingredListSelector from '../hocs/ingredListSelector'
import RecipeSaveSuccess from './RecipeSaveSuccess'

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

  handleSave = () => {
    fetch("http://localhost:4000/api/v1/user_recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.currentUserId,
        recipe_id: this.props.viewedRecipe.id
      })
    })
    .then(res => res.json())
    .then(data => {
      this.props.setRecipeSaveStatus()
    })
  }

  render() {
    let recipe

    this.props.viewedRecipe ? recipe = this.props.viewedRecipe : recipe = {}

    const renderIngredients = () => {
      let ingredients

      if (this.props.viewedRecipe) {
        ingredients = recipe['recipe_ingredients'].map(ingred => {
          return <li key={ingred.id}>{ingred.measurement} {ingred.ingredient.name}</li>
        })
      } else {
        ingredients = <li>No ingredients found</li>
      }

      return <ul>{ingredients}</ul>
    }


    return (
      <div className="recipe-view">
        <button onClick={this.backButtonClick}>Back To Recipe List</button>
        {this.props.successfulRecipeSave ? <RecipeSaveSuccess /> : <button onClick={this.handleSave}>Save Recipe</button>}
        <div className="recipeInfo">
          <h2>{recipe.name}</h2>
          <h4>Category: <span>{recipe.category}</span></h4>
          <h4>Area: <span>{recipe.area}</span></h4>
          {recipe.tags ? <h4>Tags: {recipe.tags}</h4> : null}
          <h4><a href={recipe.youtube} target="_blank" rel="noopener noreferrer">View on YouTube</a></h4>
          <h4><a href={recipe.source} target="_blank" rel="noopener noreferrer">Source</a></h4>
        </div>
        <img src={recipe.image} alt={recipe.name}/>
        <h3>Ingredients</h3>
        {recipe['recipe_ingredients'] ? renderIngredients() : null}
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    viewedRecipeId: state.viewedRecipeId,
    viewedRecipe: state.viewedRecipe,
    successfulRecipeSave: state.successfulRecipeSave
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setViewRecipe: (recipe) => dispatch({type: "SET_VIEW_RECIPE", payload: recipe}),
    clearViewRecipeId: () => dispatch({type: "CLEAR_VIEW_RECIPE_ID"}),
    setRecipeSaveStatus: () => dispatch({type: "SET_RECIPE_SAVE_STATUS"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeView)

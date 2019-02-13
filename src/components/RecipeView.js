import React, { Component } from 'react';
import { connect } from 'react-redux'
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

  handleRemove = () => {
    fetch(`http://localhost:4000/api/v1/user_recipes/${this.props.viewedUserRecipeId}`, {
      method: "DELETE"
    })
    .then(this.props.postRemoveUserRecipe(this.props.viewedUserRecipeId))
  }

  handleAddMeal = () => {
    this.props.stageMealplanRecipe(this.props.viewedRecipeId)
  }

  handleRemoveMeal = () => {
    this.props.removeMealplanRecipe(this.props.viewedRecipeId)
  }

  handleDeleteMeal = () => {
    console.log("delete meal", this.props.viewedMealId);
    fetch(`http://localhost:4000/api/v1/meals/${this.props.viewedMealId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    // .then( this.props.clearMealParams() )
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.props.setViewedMealplan(data)
    })
  }


  renderActionButton = () => {
    if (window.location.pathname === "/find-recipes") {
      return <button className="btn btn-primary" onClick={this.handleSave}>Save Recipe</button>
    } else if (window.location.pathname === "/create-mealplan") {
      if (this.props.stagedMealplanRecipes.includes(this.props.viewedRecipeId)) {
        return <button className="btn btn-primary" onClick={this.handleRemoveMeal}>Remove from Mealplan</button>
      } else {
        return <button className="btn btn-primary" onClick={this.handleAddMeal}>Add to Mealplan</button>
      }
    } else if (this.props.viewedMealplanId){
      return <button className="btn btn-primary" onClick={this.handleDeleteMeal}>Remove from Mealplan</button>
    } else {
      return <button className="btn btn-primary" onClick={this.handleRemove}>Remove Recipe</button>
    }
  }

  renderAboveView = () => {
    if (this.props.successfulRecipeSave) {
      return <RecipeSaveSuccess />
    } else {
      return <div className="row text-center recipe-view-above">
                <div className="col-md-6">
                  <button className="btn btn-primary" onClick={this.backButtonClick}>Back</button>
                </div>
                <div className="col-md-6">
                  {this.renderActionButton()}
                </div>
              </div>
    }
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

      return <ul className="list-unstyled">{ingredients}</ul>
    }


    return (
      <div className="recipe-view">
        <div className="container">
          <div className="recipe-view-inner">
            {this.renderAboveView()}

            <div className="row">
              <div className="col-md-5 col-lg-4">
                <img src={recipe.image} alt={recipe.name}/>
              </div>
              <div className="col-md-7 col-lg-8 recipe-info">
                <h2>{recipe.name}</h2>
                <h4>Category: <span>{recipe.category}</span></h4>
                <h4>Area: <span>{recipe.area}</span></h4>
                {recipe.tags ? <h4>Tags: {recipe.tags}</h4> : null}
                {recipe.youtube ? <a href={recipe.youtube} className="btn btn-primary" target="_blank" rel="noopener noreferrer">YouTube</a> : null}
                {recipe.source ? <a href={recipe.source} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Source</a> : null}
              </div>
            </div>

            <div className="row recipe-below">
              <div className="col-md-8">
                <h3>Instructions</h3>
                <p>{recipe.instructions}</p>
              </div>
              <div className="col-md-4">
                <h3>Ingredients</h3>
                {recipe['recipe_ingredients'] ? renderIngredients() : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    userRecipes: state.userRecipes,
    viewedRecipeId: state.viewedRecipeId,
    viewedRecipe: state.viewedRecipe,
    viewedUserRecipeId: state.viewedUserRecipeId,
    successfulRecipeSave: state.successfulRecipeSave,
    createdMealplan: state.createdMealplan,
    stagedMealplanRecipes: state.stagedMealplanRecipes,
    viewedMealplanId: state.viewedMealplanId,
    viewedMealId: state.viewedMealId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setViewRecipe: (recipe) => dispatch({type: "SET_VIEW_RECIPE", payload: recipe}),
    clearViewRecipeId: () => dispatch({type: "CLEAR_VIEW_RECIPE_ID"}),
    setRecipeSaveStatus: () => dispatch({type: "SET_RECIPE_SAVE_STATUS"}),
    postRemoveUserRecipe: (userRecipeId) => dispatch({type: "POST_REMOVE_USER_RECIPE", payload: userRecipeId}),
    stageMealplanRecipe: (recipe) => dispatch({type:"STAGE_RECIPE_TO_MEALPLAN", payload: recipe}),
    removeMealplanRecipe: (recipeId) => dispatch({type: "REMOVE_MEALPLAN_RECIPE", payload: recipeId}),
    clearMealParams: () => dispatch({type: "CLEAR_MEAL_PARAMS"}),
    setViewedMealplan: mealplan => dispatch({type: "SET_VIEWED_MEALPLAN", payload: mealplan})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeView)

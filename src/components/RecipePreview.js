import React, { Component } from 'react';
import { connect } from 'react-redux'

class RecipePreview extends Component {
  handleClick = () => {
    if (this.props.addingMeals) {
      // console.log(this.props.recipe)
      // debugger
      // console.log("sup")
      this.props.setViewUserRecipeId(this.props.recipe['recipe_id'], this.props.recipe.id)
    } else if (window.location.pathname === "/profile" || window.location.pathname === "/create-mealplan") {
      if (this.props.viewedMealplanId) {
        //this.props.setViewRecipeId(this.props.recipe.id)
        this.props.setViewMealIds(this.props.recipe.id, this.props.recipe['meal_id'])
      } else {
        this.props.setViewUserRecipeId(this.props.recipe['recipe_id'], this.props.recipe.id)
      }

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

const mapStateToProps = state => {
  return {
    viewedMealplanId: state.viewedMealplanId,
    addingMeals: state.addingMeals
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setViewRecipeId: (recipeId) => dispatch({type: "SET_VIEW_RECIPE_ID", payload: recipeId}),
    setViewUserRecipeId: (recipeId, userRecipeId) => dispatch({type: "SET_VIEW_USER_RECIPE_ID", payload: {recipeId, userRecipeId}}),
    setViewMealIds: (recipeId, mealId) => dispatch({type: "SET_VIEW_MEAL_IDS", payload: {recipeId, mealId}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePreview)

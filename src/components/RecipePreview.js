import React, { Component } from 'react';
import { connect } from 'react-redux'

class RecipePreview extends Component {
  handleClick = () => {
    if (this.props.addingMeals) {
      this.props.setViewUserRecipeId(this.props.recipe['recipe_id'], this.props.recipe.id)
    } else if (window.location.pathname === "/profile" || window.location.pathname === "/create-mealplan") {
      if (this.props.viewedMealplanId) {
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
      <div className="col-md-6" onClick={this.handleClick}>
        <div className="recipe-preview" style={{backgroundImage: `url(${recipe.image})`}}>
          <h4>{recipe.name}</h4>
        </div>
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

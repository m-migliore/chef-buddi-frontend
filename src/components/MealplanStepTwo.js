import React, { Component } from 'react';
import { connect } from 'react-redux'
import RecipeContainer from '../containers/RecipeContainer'

class MealplanStepTwo extends Component {

  handleClick = () => {
    console.log("create mealplan")
    console.log("title:", this.props.createdMealplanTitle)
    console.log(("recipeIds:", this.props.stagedMealplanRecipes))
    fetch("http://localhost:4000/api/v1/mealplans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.currentUserId,
        title: this.props.createdMealplanTitle,
        recipeIds: this.props.stagedMealplanRecipes
      })
    })
    .then(res => res.json())
    .then(data => {
      this.props.mealplanCreated()
    })
  }



  render() {

    return (
      <>
        <div className="container animated 1s fadeIn">
          <div className="row">
            <div className="col">
              <h3>Selected Recipes</h3>
            </div>
          </div>
          {this.props.stagedMealplanRecipes.length === 0 ?
            <h4>No Recipes Added</h4> :
            <>
              <RecipeContainer recipes={this.props.userRecipes.filter(recipe => this.props.stagedMealplanRecipes.includes(recipe['recipe_id']))} />
              <button className="btn btn-primary create-mp" onClick={this.handleClick}>Create Mealplan</button>
            </>
          }

          <div className="row">
            <div className="col">
              <h3>Add Recipes to Mealplan {this.props.createdMealplanTitle}</h3>
            </div>
          </div>
        </div>
          <RecipeContainer recipes={this.props.userRecipes.filter(recipe => !this.props.stagedMealplanRecipes.includes(recipe['recipe_id']))} />
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    userRecipes: state.userRecipes,
    createdMealplanTitle: state.createdMealplanTitle,
    stagedMealplanRecipes: state.stagedMealplanRecipes,
    successfulMealplanCreate: state.successfulMealplanCreate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeStepTwo: () => dispatch({type: "COMPLETE_MEALPLAN_STEP_TWO"}),
    mealplanCreated: () => dispatch({type: "MEALPLAN_CREATED"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanStepTwo)

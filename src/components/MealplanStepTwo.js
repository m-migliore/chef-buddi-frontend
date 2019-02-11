import React, { Component } from 'react';
import { connect } from 'react-redux'
import RecipeContainer from '../containers/RecipeContainer'

class MealplanStepTwo extends Component {

  handleClick = () => {
    this.props.completeStepTwo()
  }



  render() {

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Selected Recipes</h3>
            </div>
          </div>
          {this.props.stagedMealplanRecipes.length === 0 ?
            <h4>No Recipes Added</h4> :
            <>
              <RecipeContainer recipes={this.props.userRecipes.filter(recipe => this.props.stagedMealplanRecipes.includes(recipe['recipe_id']))} />
              <p>sup</p>
            </>
          }

          <div className="row">
            <div className="col">
              <h3>Add Recipes to Mealplan {this.props.createdMealplanTitle}</h3>
            </div>
          </div>
        </div>
        {/* <RecipeContainer recipes={this.props.userRecipes} /> */}
          <RecipeContainer recipes={this.props.userRecipes.filter(recipe => !this.props.stagedMealplanRecipes.includes(recipe['recipe_id']))} />
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    userRecipes: state.userRecipes,
    createdMealplanTitle: state.createdMealplanTitle,
    stagedMealplanRecipes: state.stagedMealplanRecipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeStepTwo: () => dispatch({type: "COMPLETE_MEALPLAN_STEP_TWO"}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanStepTwo)

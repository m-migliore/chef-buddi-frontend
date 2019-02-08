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
              <h3>Add Recipes to Mealplan {this.props.createdMealplan.title}</h3>
            </div>
          </div>
        </div>
        <RecipeContainer recipes={this.props.userRecipes} />
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    userRecipes: state.userRecipes,
    createdMealplan: state.createdMealplan,
    stagedMealplanRecipes: state.stagedMealplanRecipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeStepTwo: () => dispatch({type: "COMPLETE_MEALPLAN_STEP_TWO"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanStepTwo)

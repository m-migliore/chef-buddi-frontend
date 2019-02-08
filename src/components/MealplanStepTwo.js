import React, { Component } from 'react';
import { connect } from 'react-redux'
import RecipeContainer from '../containers/RecipeContainer'

class MealplanStepTwo extends Component {

  handleClick = () => {
    this.props.completeStepTwo()
  }

  componentDidMount() {
    const availRecipeIds = this.props.userRecipes.map(recipe => recipe['recipe_id'])
    console.log(this.props.userRecipes);
    this.props.loadAvailableRecipes(availRecipeIds)
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
          {this.props.stagedMealplanRecipes.length === 0 ? <h4>No Recipes Added</h4> :  <RecipeContainer recipes={this.props.stagedMealplanRecipes} />}

          <div className="row">
            <div className="col">
              <h3>Add Recipes to Mealplan {this.props.createdMealplan.title}</h3>
            </div>
          </div>
        </div>
        {/* <RecipeContainer recipes={this.props.userRecipes.filter(recipe => !this.props.availRecipeIds.includes(recipe['recipe_id']))} /> */}
        <RecipeContainer recipes={this.props.userRecipes} />
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    userRecipes: state.userRecipes,
    createdMealplan: state.createdMealplan,
    stagedMealplanRecipes: state.stagedMealplanRecipes,
    availableMealplanRecipes: state.availableMealplanRecipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeStepTwo: () => dispatch({type: "COMPLETE_MEALPLAN_STEP_TWO"}),
    loadAvailableRecipes: recipes => dispatch({type:"LOAD_AVAILABLE_MEALPLAN_RECIPES", payload: recipes})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanStepTwo)

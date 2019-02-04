import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
import ingredListSelector from '../hocs/ingredListSelector'
import RecipeContainer from '../containers/RecipeContainer'
import recipeListSelector from '../hocs/recipeListSelector'

class FindStepThree extends Component {

  componentDidMount() {
    fetch("http://localhost:4000/api/v1/recipes/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        selections: this.props.stepThreeIngredients.map(i => i.id)
      })
    })
    .then(res => res.json())
    .then(data => {
      this.props.loadFoundRecipes(data)
    })
  }

  render() {
    const QueryIngredientContainer = ingredListSelector(IngredientContainer, this.props.stepThreeIngredients)
    const FoundRecipeContainer = recipeListSelector(RecipeContainer, this.props.foundRecipes)

    return (
      <div className="step-two">
        <h2>selected these</h2>
        <QueryIngredientContainer />
        {this.props.foundRecipes.length > 0 ? <FoundRecipeContainer /> : null}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    selectedIngredients: state.selectedIngredients,
    stepThreeIngredients: state.stepThreeIngredients,
    foundRecipes: state.foundRecipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadFoundRecipes: recipes => dispatch({type:"LOAD_FOUND_RECIPES", payload: recipes})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindStepThree)

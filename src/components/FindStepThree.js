import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
import ingredListSelector from '../hocs/ingredListSelector'
import RecipeContainer from '../containers/RecipeContainer'
import recipeListSelector from '../hocs/recipeListSelector'
import Loader from './Loader'

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

  renderResults = () => {
    console.log("hit");
    if (this.props.foundRecipes.length > 0 ) {
      const FoundRecipeContainer = recipeListSelector(RecipeContainer, this.props.foundRecipes)
      return <FoundRecipeContainer/>
    } else {
      return <h2>No Results Found</h2>
    }
  }


  render() {
    const QueryIngredientContainer = ingredListSelector(IngredientContainer, this.props.stepThreeIngredients)
    const FoundRecipeContainer = recipeListSelector(RecipeContainer, this.props.foundRecipes)


    return (
      <div className="step-two">
        <h2>selected these</h2>
        <QueryIngredientContainer />
        {this.props.recipeSearchCompleted ? this.renderResults() : <Loader title="Recipes"/>}
        {/* <RecipeContainer ingredients={this.props.foundRecipes} /> */}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    selectedIngredients: state.selectedIngredients,
    stepThreeIngredients: state.stepThreeIngredients,
    foundRecipes: state.foundRecipes,
    recipeSearchCompleted: state.recipeSearchCompleted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadFoundRecipes: recipes => dispatch({type:"LOAD_FOUND_RECIPES", payload: recipes})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindStepThree)

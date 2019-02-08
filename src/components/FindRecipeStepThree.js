import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
import RecipeContainer from '../containers/RecipeContainer'
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

  handleClick = () => {
    this.props.resetFindParams()
  }

  renderResults = () => {
    if (this.props.foundRecipes.length > 0 ) {
      const userRecipeIds = this.props.userRecipes.map(recipe => recipe['recipe_id'])
      const cleanedFoundRecipes = this.props.foundRecipes.filter(recipe => !userRecipeIds.includes(recipe.id) )
      return <RecipeContainer recipes={cleanedFoundRecipes} />
    } else {
      return <div>
              <h2>No Results Found</h2>
              <button className="btn btn-primary" onClick={this.handleClick}>New Search</button>
             </div>
    }
  }


  render() {
    return (
      <div className="step-three">
        <div className="row">
          <div className="col">
            <h2>Search Results</h2>
          </div>
        </div>
        <h3>Selected Ingredients</h3>
        <IngredientContainer ingredients={this.props.stepThreeIngredients}/>
        {this.props.recipeSearchCompleted ? this.renderResults() : <Loader title="Recipes"/>}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    selectedIngredients: state.selectedIngredients,
    stepThreeIngredients: state.stepThreeIngredients,
    foundRecipes: state.foundRecipes,
    recipeSearchCompleted: state.recipeSearchCompleted,
    userRecipes: state.userRecipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadFoundRecipes: recipes => dispatch({type:"LOAD_FOUND_RECIPES", payload: recipes}),
    resetFindParams: () => dispatch({type: "RESET_FIND_PARAMS"}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FindStepThree)

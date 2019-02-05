import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
// import ingredListSelector from '../hocs/ingredListSelector'
import RecipeContainer from '../containers/RecipeContainer'
// import recipeListSelector from '../hocs/recipeListSelector'
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
      // const FoundRecipeContainer = recipeListSelector(RecipeContainer, this.props.foundRecipes)
      // return <FoundRecipeContainer/>
      return <RecipeContainer recipes={this.props.foundRecipes} />
    } else {
      return <div >
              <h2>No Results Found</h2>
              <button className="btn btn-primary" onClick={this.handleClick}>New Search</button>
             </div>
    }
  }


  render() {
    // const QueryIngredientContainer = ingredListSelector(IngredientContainer, this.props.stepThreeIngredients)
    // const FoundRecipeContainer = recipeListSelector(RecipeContainer, this.props.foundRecipes)


    return (
      <div className="step-three">
        <h3>Ingredients Selected:</h3>
        {/* <QueryIngredientContainer /> */}
        <IngredientContainer ingredients={this.props.stepThreeIngredients}/>
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
    loadFoundRecipes: recipes => dispatch({type:"LOAD_FOUND_RECIPES", payload: recipes}),
    resetFindParams: () => dispatch({type: "RESET_FIND_PARAMS"}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FindStepThree)

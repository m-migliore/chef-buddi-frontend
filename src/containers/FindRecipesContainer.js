import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from './containers/IngredientContainer'
import ingredListSelector from './hocs/ingredListSelector'
import RecipeContainer from './containers/RecipeContainer'
import recipeListSelector from './hocs/recipeListSelector'
import FindStepOne from '../components/FindStepOne'

class FindRecipesContainer extends Component {
  render() {
    return (
      <div class="find-recipe-container">
        <FindStepOne />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    queryIngredients: state.queryIngredients,
    // selectedIngredients: state.selectedIngredients
  }
}

export default connect(mapStateToProps)(FindRecipesContainer)

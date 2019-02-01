import React, { Component } from 'react';
import { connect } from 'react-redux'
import RecipeContainer from './RecipeContainer'
import recipeListSelector from '../hocs/recipeListSelector'
import FindStepOne from '../components/FindStepOne'
import FindStepTwo from '../components/FindStepTwo'

class FindRecipesContainer extends Component {
  render() {
    const renderStep = () => {
      switch(this.props.stepsCompleted) {
        case 0:
          return <FindStepOne />
        case 1:
          return <FindStepTwo />
        default:
          return "redner step one"
      }
    }
    return (
      <div className="find-recipe-container">
        {renderStep()}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    stepsCompleted: state.stepsCompleted,
    queryIngredients: state.queryIngredients,
    // selectedIngredients: state.selectedIngredients
  }
}

export default connect(mapStateToProps)(FindRecipesContainer)

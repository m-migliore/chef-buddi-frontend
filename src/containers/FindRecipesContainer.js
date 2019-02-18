import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import RecipeContainer from './RecipeContainer'
// import recipeListSelector from '../hocs/recipeListSelector'
import FindRecipeStepOne from '../components/FindRecipeStepOne'
import FindRecipeStepTwo from '../components/FindRecipeStepTwo'
import FindRecipeStepThree from '../components/FindRecipeStepThree'

class FindRecipesContainer extends Component {
  componentDidMount() {
    this.props.resetFindParams()
  }

  loginRedirect = () => {
    if (this.props.currentUserId === null) {
      return <Redirect to="/" />
    }
  }

  render() {
    const renderStep = () => {
      switch(this.props.findRecipeStepsCompleted) {
        case 0:
          return <FindRecipeStepOne />
        case 1:
          return <FindRecipeStepTwo />
        case 2:
          return <FindRecipeStepThree />
        default:
          return <FindRecipeStepOne />
      }
    }
    return (
      <div className="find-recipe-container  animated 1s fadeIn">
        {this.loginRedirect()}

        {renderStep()}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    findRecipeStepsCompleted: state.findRecipeStepsCompleted,
    queryIngredients: state.queryIngredients,
    // selectedIngredients: state.selectedIngredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetFindParams: () => dispatch({type: "RESET_FIND_PARAMS"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindRecipesContainer)

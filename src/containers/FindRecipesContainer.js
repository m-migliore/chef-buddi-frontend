import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import RecipeContainer from './RecipeContainer'
// import recipeListSelector from '../hocs/recipeListSelector'
import FindStepOne from '../components/FindStepOne'
import FindStepTwo from '../components/FindStepTwo'
import FindStepThree from '../components/FindStepThree'

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
      switch(this.props.stepsCompleted) {
        case 0:
          return <FindStepOne />
        case 1:
          return <FindStepTwo />
        case 2:
          return <FindStepThree />
        default:
          return <FindStepOne />
      }
    }
    return (
      <div className="find-recipe-container">
        {this.loginRedirect()}

        {renderStep()}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    stepsCompleted: state.stepsCompleted,
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

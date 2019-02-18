import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
// import ingredListSelector from '../hocs/ingredListSelector'

class FindStepTwo extends Component {
  handleClick = () => {
    if (this.props.selectedIngredients.length > 0) {
      this.props.completeStepTwo(this.props.selectedIngredients)
    }
  }

  backButtonClick = () => {
    this.props.resetFindParams()
  }

  render() {
    // const QueryIngredientContainer = ingredListSelector(IngredientContainer, this.props.ingredients)

    return (
      <div className="step-two animated 1s fadeIn">
        <div className="container">
          <div className="row">
            <div className="col">
              <button className="btn btn-primary back" onClick={this.backButtonClick}>Back</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2>Select Ingredients</h2>
              <p>Click ingredient to select</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary" onClick={this.handleClick}>Find Recipes</button>
            </div>
          </div>
        </div>

        <IngredientContainer ingredients={this.props.ingredients}/>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    ingredients: state.queryIngredients,
    selectedIngredients: state.selectedIngredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeStepTwo: ingredients => dispatch({type: "COMPLETE_STEP_TWO", payload: ingredients}),
    resetFindParams: () => dispatch({type: "RESET_FIND_PARAMS"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindStepTwo)

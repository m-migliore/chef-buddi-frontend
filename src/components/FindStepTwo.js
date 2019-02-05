import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
import ingredListSelector from '../hocs/ingredListSelector'

class FindStepTwo extends Component {
  handleClick = () => {
    this.props.completeStepTwo(this.props.selectedIngredients)
  }

  render() {
    const QueryIngredientContainer = ingredListSelector(IngredientContainer, this.props.ingredients)

    return (
      <div className="step-two">
        <div className="container">
          <div className="row">
            <div className="col">
              <button onClick={this.handleClick}>Find Recipes</button>
            </div>
          </div>
        </div>
        
        <QueryIngredientContainer />
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
    completeStepTwo: ingredients => dispatch({type: "COMPLETE_STEP_TWO", payload: ingredients})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindStepTwo)

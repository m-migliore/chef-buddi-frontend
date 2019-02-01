import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
import ingredListSelector from '../hocs/ingredListSelector'

class FindStepThree extends Component {

  render() {
    const QueryIngredientContainer = ingredListSelector(IngredientContainer, this.props.stepThreeIngredients)

    return (
      <div className="step-two">
        <h2>selected these</h2>
        <QueryIngredientContainer />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    ingredients: state.selectedIngredients,
    stepThreeIngredients: state.stepThreeIngredients
  }
}

export default connect(mapStateToProps)(FindStepThree)

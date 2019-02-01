import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from '../containers/IngredientContainer'
import ingredListSelector from '../hocs/ingredListSelector'

class FindStepTwo extends Component {

  render() {
    const QueryIngredientContainer = ingredListSelector(IngredientContainer, this.props.ingredients)

    return (
      <div className="step-two">
        <QueryIngredientContainer />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    ingredients: state.queryIngredients
  }
}

export default connect(mapStateToProps)(FindStepTwo)

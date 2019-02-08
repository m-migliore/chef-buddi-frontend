import React, { Component } from 'react';
import { connect } from 'react-redux'

class MealplanStepOne extends Component {

  handleClick = () => {
    this.props.completeStepOne()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div>mp step 1</div>
            <button onClick={this.handleClick}>Complete</button>
          </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    completeStepOne: () => dispatch({type: "COMPLETE_MEALPLAN_STEP_ONE"})
  }
}

export default connect(null, mapDispatchToProps)(MealplanStepOne)

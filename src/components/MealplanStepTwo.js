import React, { Component } from 'react';
import { connect } from 'react-redux'

class MealplanStepTwo extends Component {

  handleClick = () => {
    this.props.completeStepTwo()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div>mp step 2</div>
            <button onClick={this.handleClick}>Complete</button>
          </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    completeStepTwo: () => dispatch({type: "COMPLETE_MEALPLAN_STEP_TWO"})
  }
}

export default connect(null, mapDispatchToProps)(MealplanStepTwo)

import React, { Component } from 'react';
import { connect } from "react-redux"
import MealplanStepOne from '../components/MealplanStepOne'
import MealplanStepTwo from '../components/MealplanStepTwo'
import { Redirect } from 'react-router-dom'

class CreateMealPlan extends Component {

  componentDidMount() {
    this.props.clearMealplanData()
  }

  render() {
    const renderStep = () => {
      switch(this.props.mealplanStepsCompleted) {
        case 0:
          return <MealplanStepOne />
        case 1:
          return <MealplanStepTwo />
        default:
          return <MealplanStepOne />
      }
    }
    return (

      <div className="create-mealplan">
        {this.props.currentUserId ? null : <Redirect to="/" />}

        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Create Mealplan</h2>
              {renderStep()}
            </div>
          </div>
        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    mealplanStepsCompleted: state.mealplanStepsCompleted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearMealplanData: () => dispatch({type: "CLEAR_MEALPLAN_DATA"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMealPlan)

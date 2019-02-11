import React, { Component } from 'react';
import { connect } from "react-redux"
import MealplanStepOne from '../components/MealplanStepOne'
import MealplanStepTwo from '../components/MealplanStepTwo'
import MealplanStepThree from '../components/MealplanStepThree'
import { Redirect } from 'react-router-dom'

class CreateMealPlan extends Component {

  render() {
    const renderStep = () => {
      switch(this.props.mealplanStepsCompleted) {
        case 0:
          return <MealplanStepOne />
        case 1:
          return <MealplanStepTwo />
        case 2:
          return <MealplanStepThree />
        default:
          return <MealplanStepOne />
      }
    }
    return (

      <>
        {this.props.currentUserId ? null : <Redirect to="/" />}

        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Create Mealplan</h2>
              {renderStep()}
            </div>
          </div>
        </div>
      </>

    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    mealplanStepsCompleted: state.mealplanStepsCompleted
  }
}

export default connect(mapStateToProps)(CreateMealPlan)

import React, { Component } from 'react';
import { connect } from "react-redux"
import MealplanStepOne from '../components/MealplanStepOne'
import MealplanStepTwo from '../components/MealplanStepTwo'
import MealplanStepThree from '../components/MealplanStepThree'

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

      <div className="container">
        <div className="row">
          <div className="col">
            <h2>create meal plan title and stuff yo</h2>
            {renderStep()}
          </div>
        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    mealplanStepsCompleted: state.mealplanStepsCompleted
  }
}

export default connect(mapStateToProps)(CreateMealPlan)

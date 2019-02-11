import React, { Component } from 'react';
import { connect } from 'react-redux'
import MealplanPreview from '../components/MealplanPreview'

class MealplanContainer extends Component {

  render() {
    return (
      <div>
        {this.props.userMealplans.map(mealplan => <MealplanPreview mealplan={mealplan} />)}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userMealplans: state.userMealplans
  }
}

export default connect(mapStateToProps)(MealplanContainer)

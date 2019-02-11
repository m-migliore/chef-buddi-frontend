import React, { Component } from 'react';
import { connect } from 'react-redux'

class MealplanContainer extends Component {

  render() {
    return (
      <div>
        {this.props.userMealplans.map(mealplan => <h4>{mealplan.title}</h4>)}
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

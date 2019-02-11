import React, { Component } from 'react';
import { connect } from 'react-redux'

class MealplanPreview extends Component {
  handleClick = () => {
    this.props.setMealplanId(this.props.mealplan.id)
  }

  render() {
    const mealplan = this.props.mealplan

    return (
      <div className="col-md-3">
        <div className="mealplan-preview">
          <h3>{mealplan.title}</h3>
          <p>Created: {mealplan['created_at']}</p>
          <p>Meals: {mealplan.mealCount}</p>
          <button className="btn btn-blue" onClick={this.handleClick}>View</button>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    setMealplanId: mealplanId => dispatch({type: "SET_VIEWED_MEALPLAN_ID", payload: mealplanId})
  }
}

export default connect(null, mapDispatchToProps)(MealplanPreview)

import React, { Component } from 'react';

class MealplanPreview extends Component {

  render() {
    const mealplan = this.props.mealplan

    return (
      <div className="mealplan-preview">
        <h3>{mealplan.title}</h3>
        <p>Created: {mealplan['created_at']}</p>
        <p>Meals: {mealplan.mealCount}</p>
      </div>
    );
  }

}

export default MealplanPreview;

import React, { Component } from 'react';
import { connect } from 'react-redux'
import MealplanPreview from '../components/MealplanPreview'
import MealplanView from '../components/MealplanView'

class MealplanContainer extends Component {

  render() {
    return (
      <div className="mealplan-container">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>User Mealplans</h3>
            </div>
          </div>
        </div>

        {/* <div className="row">
          {this.props.viewedMealplanId ? <MealplanView /> : this.props.userMealplans.map(mealplan => <MealplanPreview key={mealplan.id} mealplan={mealplan} />)}
        </div> */}
        {this.props.viewedMealplanId ? <MealplanView /> :
          <div className="container">
            <div className="row">
              {this.props.userMealplans.map(mealplan => <MealplanPreview key={mealplan.id} mealplan={mealplan} />)}
            </div>
          </div>
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userMealplans: state.userMealplans,
    viewedMealplanId: state.viewedMealplanId
  }
}

export default connect(mapStateToProps)(MealplanContainer)

import React, { Component } from 'react';
import { connect } from "react-redux"
import RecipeContainer from '../containers/RecipeContainer'

class MealplanView extends Component {
  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/mealplans/${this.props.viewedMealplanId}`)
    .then(res => res.json())
    .then(data => {
      this.props.setViewedMealplan(data)
    })
  }

  render() {
    const mealplan = this.props.viewedMealplan


    return (
      <div>
        {this.props.viewedMealplan ? <h4>{this.props.viewedMealplan.title}</h4> : null}
        {this.props.viewedMealplan ? <RecipeContainer recipes={mealplan.recipes}/> : <h4>No Meals Found</h4>}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    viewedMealplanId: state.viewedMealplanId,
    viewedMealplan: state.viewedMealplan
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setViewedMealplan: mealplan => dispatch({type: "SET_VIEWED_MEALPLAN", payload: mealplan})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanView)

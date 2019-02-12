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

  // componentDidUpdate() {
  //   console.log("update hit")
  //   if (this.props.mealDeleted) {
  //     fetch(`http://localhost:4000/api/v1/mealplans/${this.props.viewedMealplanId}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       debugger
  //       console.log("ftch hit")
  //       this.props.setViewedMealplan(data)
  //     })
  //   }
  // }

  handleClick = () => {
    console.log("delete mealplan");
  }

  render() {
    const mealplan = this.props.viewedMealplan


    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {this.props.viewedMealplan ? <h4>{this.props.viewedMealplan.title}</h4> : null}
            </div>
            <div className="col-12">
              <button className="btn btn-primary" onClick={this.handleClick}>Delete Mealplan</button>
            </div>
          </div>
        </div>

        {this.props.viewedMealplan ? <RecipeContainer recipes={mealplan.recipes}/> : <h4>No Meals Found</h4>}
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    viewedMealplanId: state.viewedMealplanId,
    viewedMealplan: state.viewedMealplan,
    mealDeleted: state.mealDeleted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setViewedMealplan: mealplan => dispatch({type: "SET_VIEWED_MEALPLAN", payload: mealplan})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanView)

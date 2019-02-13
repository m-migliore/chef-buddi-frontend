import React, { Component } from 'react';
import { connect } from "react-redux"
import RecipeContainer from '../containers/RecipeContainer'
import IngredientContainer from '../containers/IngredientContainer'

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
    fetch(`http://localhost:4000/api/v1/mealplans/${this.props.viewedMealplanId}`, {
      method: "DELETE"
    })
    .then( this.props.postMealplanDelete(this.props.viewedMealplanId) )

  }

  render() {
    const mealplan = this.props.viewedMealplan


    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {this.props.viewedMealplan ? <h2>{this.props.viewedMealplan.title}</h2> : null}
            </div>
            <div className="col-12">
              <button className="btn btn-primary" onClick={this.handleClick}>Delete Mealplan</button>
            </div>
          </div>
        </div>

        <div className="mealplan-meals">
          <div className="container">
            <div className="row">
              <div className="col">
                <h3 className="rainbow-sub">Meals</h3>
              </div>
            </div>
          </div>
          {this.props.viewedMealplan ? <RecipeContainer recipes={mealplan.recipes}/> : <h4>No Meals Found</h4>}
        </div>

        <div className="mealplan-shopping-list">
          <div className="container">
            <div className="row">
              <div className="col">
                <h3 className="rainbow-sub">Shopping List</h3>
              </div>
            </div>
          </div>
          {this.props.viewedMealplan ? <IngredientContainer ingredients={mealplan.shoppingList}/> : <h4>Shopping List is Empty</h4>}
        </div>
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
    setViewedMealplan: mealplan => dispatch({type: "SET_VIEWED_MEALPLAN", payload: mealplan}),
    postMealplanDelete: deletedMealplanId => dispatch({type: "POST_MEALPLAN_DELETE", payload: deletedMealplanId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanView)

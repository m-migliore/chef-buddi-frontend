import React, { Component } from 'react';
import { connect } from 'react-redux'

class FindStepOne extends Component {

  handleClick = e => {
    if (e.target.name === "user") {
      this.props.loadQueryIngredients("user")
    } else {
      this.props.loadQueryIngredients("all")
    }
  }

  render() {
    return (
      <div className="step-one container">
        <div className="row">
          <div className="col">
            <h2>Select Ingredient Pool</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button name="user" className="btn btn-primary" onClick={this.handleClick}>Your Ingredients</button>
          </div>
          <div className="col-md-6">
            <button name="all" className="btn btn-primary" onClick={this.handleClick}>All Ingredients</button>
          </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    loadQueryIngredients: ingredientList => dispatch({type: "LOAD_QUERY_INGREDIENTS", payload: ingredientList})
  }
}

export default connect(null, mapDispatchToProps)(FindStepOne)

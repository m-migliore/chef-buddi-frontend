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
      <div>
        <h2>Step 1. Select Ingredients</h2>
        <button name="user" onClick={this.handleClick}>Your Ingredients</button>
        <button name="all" onClick={this.handleClick}>All Ingredients Ingredients</button>
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

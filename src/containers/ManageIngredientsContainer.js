import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from './IngredientContainer'

class ManageIngredientsContainer extends Component {

  componentDidMount() {
    this.props.clearParams()
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Manage Ingredients</h2>
            </div>
          </div>
        </div>

        <h3>User Ingredients</h3>
        <IngredientContainer ingredients={this.props.userIngredients} />

        <h3>All Ingredients</h3>
        <IngredientContainer ingredients={this.props.ingredients} />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    userIngredients: state.userIngredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearParams: () => dispatch({type: "CLEAR_ALL_PARAMS"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageIngredientsContainer)

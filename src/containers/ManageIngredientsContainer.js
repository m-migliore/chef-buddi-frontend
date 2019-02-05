import React, { Component } from 'react';
import { connect } from 'react-redux'
import IngredientContainer from './IngredientContainer'

class ManageIngredientsContainer extends Component {
  hideUserIngreds = (ingredientId) => {
    const userIngredIds = this.props.userIngredients.map(ingred => ingred['ingredient_id'])
    return userIngredIds.includes(ingredientId)
  }

  render() {
    const nonUserIngredients = this.props.ingredients.filter(ingred => !this.hideUserIngreds(ingred.id))
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
        <IngredientContainer ingredients={nonUserIngredients} />
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


export default connect(mapStateToProps)(ManageIngredientsContainer)

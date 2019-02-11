import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import IngredientContainer from './IngredientContainer'

class ManageIngredientsContainer extends Component {
  hideUserIngreds = (ingredientId) => {
    const userIngredIds = this.props.userIngredients.map(ingred => ingred['ingredient_id'])
    return userIngredIds.includes(ingredientId)
  }

  loginRedirect = () => {
    if (this.props.currentUserId === null) {
      return <Redirect to="/" />
    }
  }

  render() {

    const nonUserIngredients = this.props.ingredients.filter(ingred => !this.hideUserIngreds(ingred.id))

    return (
      <div className="manage-ingredients">
        {this.loginRedirect()}

        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Manage Ingredients</h2>
            </div>
          </div>
        </div>

        <h3>User Ingredients</h3>
        {this.props.userIngredients.length === 0 ? <p>Add ingredients to your list</p> : <IngredientContainer ingredients={this.props.userIngredients} />}

        <h3>All Ingredients</h3>
        {this.props.userIngredients.length === 0 ? <IngredientContainer ingredients={this.props.ingredients} /> : <IngredientContainer ingredients={nonUserIngredients} />}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    ingredients: state.ingredients,
    userIngredients: state.userIngredients
  }
}


export default connect(mapStateToProps)(ManageIngredientsContainer)

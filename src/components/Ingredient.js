import React, { Component } from 'react';
import { connect } from 'react-redux'

class Ingredient extends Component {

  createTitleName = (name) => {
    let titledName = name.split(" ").map(word => {
      let letters = word.split("")
      letters[0] = letters[0].toUpperCase()
      return word = letters.join("")
    }).join(" ")
    return titledName
  }

  handleClick = () => {
    //this.props.selectIngredient(this.props.ingred.id)

    if (window.location.pathname === "/find-recipes") {
      this.props.selectIngredient(this.props.ingred.id)
    } else if (window.location.pathname === "/manage-ingredients") {
      if (this.props.userIngredients.includes(this.props.ingred)) {
        console.log("props", this.props.ingred.id)
        fetch(`http://localhost:4000/api/v1/user_ingredients/${this.props.ingred.id}`, {
          method: "DELETE"
        })
        .then(this.props.removeUserIngredient(this.props.ingred.id))

      } else {
        // console.log("add", this.props.ingred)
        fetch("http://localhost:4000/api/v1/user_ingredients/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            user_id: this.props.currentUserId,
            ingredient_id: this.props.ingred.id
          })
        })
        .then(res => res.json())
        .then(data => this.props.addUserIngredient(data))
      }
    }

  }

  render() {
    const ingred = this.props.ingred

    return (
      <div className={this.props.selectedIngredients.includes(ingred.id) ? "ingredient selected" : "ingredient"} onClick={this.handleClick}>
        <h4>{this.createTitleName(ingred.name)}</h4>
        {/* {this.props.selectable ? "sup" : "nope"} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    selectedIngredients: state.selectedIngredients,
    userIngredients: state.userIngredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectIngredient: (ingredientId) => dispatch({type: "SELECT_INGREDIENT", payload: ingredientId}),
    removeUserIngredient: (ingredientId) => dispatch({type: "REMOVE_USER_INGREDIENT", payload: ingredientId}),
    addUserIngredient: (ingredientId) => dispatch({type: "ADD_USER_INGREDIENT", payload: ingredientId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient)

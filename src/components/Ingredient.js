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
      if (this.props.userIngredSearch) {
        this.props.selectIngredient(this.props.ingred['ingredient_id'])
      } else {
        this.props.selectIngredient(this.props.ingred.id)
      }
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

  renderIngredClass = () => {
  //  if (window.location.pathname === "/find-recipes") {
    //   if (this.props.userIngredSearch) {
    //     if (this.props.selectedIngredients.includes(this.props.ingred['ingredient_id'])) {
    //       return  "ingredient selected"
    //     } else {
    //       return "ingredient"
    //     }
    //   } else {
    //     if (this.props.selectedIngredients.includes(this.props.ingred.id)) {
    //       return "ingredient selected"
    //     } else {
    //       return "ingrdi"
    //     }
    //   }
    // } else {
    //   return "ingredient"
    // }



    if (this.props.userIngredSearch && this.props.selectedIngredients.includes(this.props.ingred['ingredient_id'])) {
      return  "ingredient selected"
    } else if (this.props.selectedIngredients.includes(this.props.ingred.id)) {
      return  "ingredient selected"
    } else {
      return "ingredient"
    }
  }

  render() {
    // const ingred = this.props.ingred

    return (
      // <div className={this.props.selectedIngredients.includes(ingred.id) ? "ingredient selected" : "ingredient"} onClick={this.handleClick}>
      //   <h4>{this.createTitleName(ingred.name)}</h4>
      // </div>
      <p
        className={this.renderIngredClass()}
        onClick={this.handleClick}
        >
        {this.createTitleName(this.props.ingred.name)}
      </p>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    selectedIngredients: state.selectedIngredients,
    userIngredients: state.userIngredients,
    userIngredSearch: state.userIngredSearch
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

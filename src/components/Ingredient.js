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
    this.props.selectIngredient(this.props.ingred.id)
  }

  render() {
    const ingred = this.props.ingred

    return (
      <div className={this.props.selectedIngredients.includes(ingred.id) ? "ingredient selected" : "ingredient"} onClick={this.handleClick}>
        <h3>{this.createTitleName(ingred.name)}</h3>
        {/* {this.props.selectable ? "sup" : "nope"} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedIngredients: state.selectedIngredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectIngredient: (ingredientId) => dispatch({type: "ADD_SELECTED_INGREDIENT", payload: ingredientId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient)

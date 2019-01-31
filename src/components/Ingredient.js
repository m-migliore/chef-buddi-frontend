import React, { Component } from 'react';

class Ingredient extends Component {


  createTitleName = (name) => {
    let titledName = name.split(" ").map(word => {
      let letters = word.split("")
      letters[0] = letters[0].toUpperCase()
      return word = letters.join("")
    }).join(" ")
    return titledName
  }

  render() {
    const ingred = this.props.ingred

    return (
      <div className="ingredient">{this.createTitleName(ingred.name)}</div>
    );
  }

}

export default Ingredient;

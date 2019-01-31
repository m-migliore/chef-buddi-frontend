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

  // handleClick = () => {
  //   console.log("clicked")
  // }

  render() {
    const ingred = this.props.ingred

    return (
      <div className="ingredient">
        <h3>{this.createTitleName(ingred.name)}</h3>
        {this.props.selectable ? "sup" : "nope"}
      </div>
    );
  }

}

export default Ingredient;

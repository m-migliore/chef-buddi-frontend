import React, { Component } from 'react';

class FindRecipesContainer extends Component {
  handleClick = e => {
    if (e.target.name === "user") {
      console.log("user ingredents")
    } else {
      console.log("all ingredients")
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

export default FindRecipesContainer

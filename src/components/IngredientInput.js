import React, { Component } from 'react';

class IngredientInput extends Component {

  render() {
    return (
      <div className="form-group">
        <label htmlFor={`ingred-input-${this.props.idx}`}>Ingredient {this.props.idx}</label>
        <input
          type="text"
          name={`ingred-${this.props.idx}`}
          // value={this.state.username}
          placeholder="Enter Ingredient Name"
          onChange={this.handleChange}
          id={`ingred-input-${this.props.idx}`}
          className="form-control"
        />
      </div>
    );
  }

}

export default IngredientInput;

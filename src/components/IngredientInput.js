import React, { Component } from 'react';

class IngredientInput extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4>Ingredient {this.props.idx}</h4>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`ingred-name-input-${this.props.idx}`}>Name</label>
            <input
              type="text"
              name={`ingred-${this.props.idx}`}
              // value={this.state.username}
              placeholder="Enter Ingredient Name"
              onChange={this.handleChange}
              id={`ingred-name-input-${this.props.idx}`}
              className="form-control ingred-name-input"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`ingred-input-${this.props.idx}`}>Measurement</label>
            <input
              type="text"
              name={`ingred-${this.props.idx}`}
              // value={this.state.username}
              placeholder="Enter Ingredient Measurement"
              onChange={this.handleChange}
              id={`ingred-measurement-input-${this.props.idx}`}
              className="form-control ingred-measurement-input"
            />
          </div>
        </div>
      </div>
    );
  }

}

export default IngredientInput;

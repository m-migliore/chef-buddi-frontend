import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class RecipeSaveSuccess extends Component {
  handleClick = e => {
    if (e.target.name === "new") {
      this.props.resetFindParams()
    } else {
      <Redirect to="/profile"/>
    }
  }

  render() {
    return (
      <div className="save-success">
        <h4>Recipe Saved</h4>
        <button onClick={this.handleClick} name="new">New Search</button>
        <button onClick={this.handleClick} name="view">View Saved Recipes</button>
      </div>
    );
  }

}

const mapDispatchToProps = () => {
  return {
    resetFindParams: () => dispatch({type: "RESET_FIND_PARAMS"})
  }
}

export default connect(null, mapDispatchToProps)(RecipeSaveSuccess)

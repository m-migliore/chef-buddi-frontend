import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class RecipeSaveSuccess extends Component {
  handleClick = e => {
    if (e.target.name === "new") {
      this.props.resetFindParams()
    } else {
      return <Redirect to="/profile"/>
    }
  }

  render() {
    return (
      <div className="row save-success">
        <div className="col-12">
          <h4>Recipe Saved</h4>
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={this.handleClick} name="new">New Search</button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={this.handleClick} name="view">View Saved Recipes</button>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    resetFindParams: () => dispatch({type: "RESET_FIND_PARAMS"}),
  }
}

export default connect(null, mapDispatchToProps)(RecipeSaveSuccess)

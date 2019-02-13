import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class MealAddSuccess extends Component {

  handleClick = e => {
    if (e.target.name === "new") {
      this.props.resetFindParams()
    } else {
      console.log("redirect")
      this.setState({
        redirect: true
      })
    }
  }


  render() {
    return (
      <div className="row save-success text-center">

        <div className="col-12">
          <h4>Meal Added</h4>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" onClick={this.handleClick} name="new">Back</button>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    resetFindParams: () => dispatch({type: "RESET_FIND_PARAMS"}),
    setProfileView: (viewName) => dispatch({type: "SET_PROFILE_VIEW", payload: viewName})
  }
}

export default connect(null, mapDispatchToProps)(MealAddSuccess)

import React, { Component } from 'react';
import { connect } from 'react-redux'

class MealplanStepOne extends Component {
  state = {
    title: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // fetch("http://localhost:4000/api/v1/mealplans", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify({
    //     user_id: this.props.currentUserId,
    //     title: this.state.title
    //   })
    // })
    // .then(res => res.json())
    // .then(data => {
    //   this.props.completeStepOne(data)
    // })
    this.props.completeStepOne(this.state.title)
  }

  render() {
    return (
      <div className="container animated 1s fadeIn">
        <div className="row">
          <div className="col-12">
            <h3 className="rainbow-sub">Add a Title</h3>
          </div>
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title-input">Mealplan Title</label>
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  placeholder="Enter title for mealplan"
                  onChange={this.handleChange}
                  id="title-input"
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary" type="submit">Create Mealplan</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}


const mapDispatchToProps = dispatch => {
  return {
    completeStepOne: (mealplan) => dispatch({type: "COMPLETE_MEALPLAN_STEP_ONE", payload: mealplan})
  }
}

export default connect(null, mapDispatchToProps)(MealplanStepOne)

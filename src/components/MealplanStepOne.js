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
    fetch("http://localhost:4000/api/v1/mealplans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.currentUserId,
        title: this.state.title
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  handleClick = () => {
    this.props.completeStepOne()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Add a Title</h3>
            {/* <button onClick={this.handleClick}>Complete</button> */}
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

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeStepOne: () => dispatch({type: "COMPLETE_MEALPLAN_STEP_ONE"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanStepOne)

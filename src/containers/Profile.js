import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import IngredientContainer from './IngredientContainer'
import RecipeContainer from './RecipeContainer'
import MealplanContainer from './MealplanContainer'

class Profile extends Component {
  state = {
    view: "ingredients"
  }

  componentDidMount() {
    this.props.clearMealplanData()
    
    if (this.props.currentUserId) {
      fetch(`http://localhost:4000/api/v1/users/${this.props.currentUserId}`)
      .then(res => res.json())
      .then(data => {
        console.log("logged in")
        this.props.setUser(data)
      })
    }
  }

  loginRedirect = () => {
    if (this.props.currentUserId === null) {
      return <Redirect to="/" />
    }
  }

  renderInterior = () => {
    switch(this.state.view) {
      case "ingredients":
        return <>
                {this.props.currentUser.ingredients? <h3>User Ingredients</h3> : <h3>No Ingredients Found</h3>}
                {this.props.currentUser.ingredients ? <IngredientContainer ingredients={this.props.currentUser.ingredients}/> : null}
               </>
      case "recipes":
        return <>
                {this.props.currentUser.recipes ? <h3>User Recipes</h3> : <h3>No Recipes Found</h3>}
                {this.props.currentUser.recipes ? <RecipeContainer recipes={this.props.userRecipes} /> : null}
               </>
      case "mealplans":
        return <MealplanContainer />
      default:
        return <>
                {this.props.currentUser.ingredients? <h3>User Ingredients</h3> : <h3>No Ingredients Found</h3>}
                {this.props.currentUser.ingredients ? <IngredientContainer ingredients={this.props.currentUser.ingredients}/> : null}
               </>
    }
  }

  handleClick = e => {
    this.props.clearMealplanData()
    this.setState({
      view: e.target.name
    })
  }


  render() {

    return (
      <div className="profile">
        {this.loginRedirect()}

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{this.props.currentUser.username}'s Profile</h2>
            </div>
          </div>
        </div>

        <div className="container btn-box">
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-green" onClick={this.handleClick} name="ingredients">View Ingredients</button>
            </div>
            <div className="col-md-3">
              <button className="btn btn-blue" onClick={this.handleClick} name="recipes">View Recipes</button>
            </div>
            <div className="col-md-3">
              <Link to="/create-mealplan" className="btn btn-red">Create Mealplan</Link>
            </div>
            <div className="col-md-3">
              <button className="btn btn-orange" onClick={this.handleClick} name="mealplans">View Mealplans</button>
            </div>
          </div>
        </div>

        {this.renderInterior()}

        {/* {this.props.currentUser.ingredients? <h3>User Ingredients</h3> : <h3>No Ingredients Found</h3>}
        {this.props.currentUser.ingredients ? <IngredientContainer ingredients={this.props.currentUser.ingredients}/> : null}
        {this.props.currentUser.recipes ? <h3>User Recipes</h3> : <h3>No Recipes Found</h3>}
        {this.props.currentUser.recipes ? <RecipeContainer recipes={this.props.userRecipes} /> : null} */}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    currentUser: state.currentUser,
    userRecipes: state.userRecipes,
    userMealplans: state.userMealplans
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (userData) => dispatch({type: "SET_CURRENT_USER", payload: userData}),
    clearMealplanData: () => dispatch({type: "CLEAR_MEALPLAN_DATA"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

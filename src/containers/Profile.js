import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import IngredientContainer from './IngredientContainer'
import RecipeContainer from './RecipeContainer'
import MealplanContainer from './MealplanContainer'

class Profile extends Component {
  // state = {
  //   view: "ingredients"
  // }

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
    // switch(this.state.view) {
    switch(this.props.profileView) {
      case "ingredients":
        return <>
                <div className="container animated 1s fadeIn">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="rainbow-sub">Your Ingredients</h3>
                    </div>
                    <div className="col-12">
                      <Link to="/manage-ingredients" className="btn btn-primary">Manage Ingredients</Link>
                    </div>
                  </div>
                </div>

                {this.props.userIngredients.length > 0 ? <IngredientContainer ingredients={this.props.userIngredients}/> : <h4>No Ingredients Found</h4>}
               </>
      case "recipes":
        return <>
                <div className="container animated 1s fadeIn">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="rainbow-sub">Your Recipes</h3>
                    </div>
                    <div className="col-md-6 text-right">
                      <Link to="/find-recipes" className="btn btn-primary">Find Recipes</Link>
                    </div>
                    <div className="col-md-6 text-left">
                      <Link to="/add-recipe" className="btn btn-primary">Add Recipe</Link>
                    </div>
                  </div>
                </div>

                {this.props.userRecipes.length > 0 ? <RecipeContainer recipes={this.props.userRecipes} /> : <h4>No Recipes Found</h4>}
               </>
      case "mealplans":
        //return <MealplanContainer />
        return <>
                  <div className="container animated 1s fadeIn">
                    <div className="row">
                      <div className="col-12">
                        <h3 className="rainbow-sub">Your Mealplans</h3>
                      </div>
                    </div>
                  </div>

                  {this.props.userMealplans.length > 0 ? <MealplanContainer /> : <h4>No Mealplans Found</h4>}
               </>
      default:
        return <>
                <div className="container animated 1s fadeIn">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="rainbow-sub">Ingredients</h3>
                    </div>
                    <div className="col-12">
                      <Link to="/manage-ingredients" className="btn btn-primary">Manage Ingredients</Link>
                    </div>
                  </div>
                </div>

                {this.props.userIngredients.length > 0 ? <IngredientContainer ingredients={this.props.userIngredients}/> : <h4>No Ingredients Found</h4>}
               </>
    }
  }

  handleClick = e => {
    this.props.clearMealplanData()
    // this.setState({
    //   view: e.target.name
    // })
    this.props.setProfileView(e.target.name)
  }


  render() {
    if (this.props.mealDeleted) {
      fetch(`http://localhost:4000/api/v1/users/${this.props.currentUserId}`)
      .then(res => res.json())
      .then(data => {
        console.log("logged in")
        this.props.setUser(data)
      })
    }

    return (
      <div className="profile animated 1s fadeIn">
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
              <button className="btn btn-red" onClick={this.handleClick} name="mealplans">View Mealplans</button>
            </div>
            <div className="col-md-3">
              <Link to="/create-mealplan" className="btn btn-orange">Create Mealplan</Link>
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
    userIngredients: state.userIngredients,
    userMealplans: state.userMealplans,
    mealDeleted: state.mealDeleted,
    profileView: state.profileView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (userData) => dispatch({type: "SET_USER_DATA", payload: userData}),
    clearMealplanData: () => dispatch({type: "CLEAR_MEALPLAN_DATA"}),
    setProfileView: (viewName) => dispatch({type: "SET_PROFILE_VIEW", payload: viewName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

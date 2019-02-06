import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './containers/Navbar'
import Home from './containers/Home'
import Profile from './containers/Profile'
import IngredientContainer from './containers/IngredientContainer'
import RecipeContainer from './containers/RecipeContainer'
import ingredListSelector from './hocs/ingredListSelector'
import recipeListSelector from './hocs/recipeListSelector'
import FindRecipesContainer from './containers/FindRecipesContainer'
import ManageIngredientsContainer from './containers/ManageIngredientsContainer'
import RecipeView from './components/RecipeView'


class App extends Component {
  componentDidMount() {
    fetch("http://localhost:4000/api/v1/ingredients")
    .then(res => res.json())
    .then(data => {
      this.props.loadIngredients(data)
    })

    fetch("http://localhost:4000/api/v1/recipes")
    .then(res => res.json())
    .then(data => {
      this.props.loadRecipes(data)
    })

    // move to login once auth is setup
    // fetch(`http://localhost:4000/api/v1/users/4`)
    // .then(res => res.json())
    // .then(data => {
    //   this.props.loadUserIngredients(data.ingredients)
    // })
  }


  render() {
    const AllIngredientContainer = ingredListSelector(IngredientContainer, this.props.ingredients)
    const AllRecipeContainer = recipeListSelector(RecipeContainer, this.props.recipes)

    return (
      <Router>
      <>
        <div className={this.props.viewedRecipeId ? "App blurred" : "App"}>
          <Navbar />
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact render={() => (
            this.props.currentUserId ? (
              <Redirect to="/profile" />
            ) : (
              <Home />
            )
          )} />
          <Route path="/ingredients" render={props => <AllIngredientContainer />} />
          <Route path="/recipes" render={props => <AllRecipeContainer />} />
          <Route path="/profile" component={Profile} />
          <Route path="/find-recipes" component={FindRecipesContainer} />
          <Route path="/manage-ingredients" component={ManageIngredientsContainer} />
        </div>
        {this.props.viewedRecipeId ? <RecipeView /> : null}
      </>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    ingredients: state.ingredients,
    recipes: state.recipes,
    viewedRecipeId: state.viewedRecipeId,
    viewedRecipe: state.viewedRecipe
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadIngredients: (ingredients) => dispatch({type: "LOAD_INGREDIENTS", payload: ingredients}),
    loadRecipes: (recipes) => dispatch({type: "LOAD_RECIPES", payload: recipes}),
    loadUserIngredients: (ingredients) => dispatch({type: "LOAD_USER_INGREDIENTS", payload: ingredients})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

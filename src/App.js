import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { connect } from 'react-redux'
import Home from './containers/Home'
import Profile from './containers/Profile'
import IngredientContainer from './containers/IngredientContainer'
import RecipeContainer from './containers/RecipeContainer'
import RecipeView from './components/RecipeView'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Chef Buddi</h1>
          <Route path="/" exact component={Home} />
          <Route path="/ingredients" component={IngredientContainer} />
          <Route path="/recipes" component={RecipeContainer} />
          <Route path="/profile" component={Profile} />
          <Route path="/test-recipe" component={RecipeView} />
        </div>

      </Router>
    );
  }
}

export default App

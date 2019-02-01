 import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './containers/Navbar'
import Home from './containers/Home'
import Profile from './containers/Profile'
import IngredientContainer from './containers/IngredientContainer'
import RecipeContainer from './containers/RecipeContainer'
import RecipeView from './components/RecipeView'
import ingredSelector from './hocs/ingredSelector'


class App extends Component {
  componentDidMount() {
    fetch("http://localhost:4000/api/v1/ingredients")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.props.loadIngredients(data)
    })
  }


  render() {
    const AllIngredientContainer = ingredSelector(IngredientContainer, this.props.ingredients)

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={Home} />
          {/* <Route path="/ingredients" component={IngredientContainer} /> */}
          <Route path="/ingredients" render={props => <AllIngredientContainer />} />
          <Route path="/recipes" component={RecipeContainer} />
          <Route path="/profile" component={Profile} />
          <Route path="/test-recipe" component={RecipeView} />
        </div>

      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadIngredients: (loadedIngredients) => dispatch({type: "LOAD_INGREDIENTS", payload: loadedIngredients})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

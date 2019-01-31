import React, { Component } from 'react';
import './App.css';
// import { connect } from 'react-redux'
import IngredientContainer from './containers/IngredientContainer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App Home</h1>
        <IngredientContainer />
      </div>
    );
  }
}

export default App

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const defaultState = {
  currentUserId: 3,
  userIngredients: [],
  ingredients: [],
  userRecipes: [],
  recipes: []
}

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case "LOAD_INGREDIENTS":
      return {...state, ingredients: action.ingredients}
    case "VIEW_RECIPE":
      return console.log("view recipe");
    default:
      return defaultState
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

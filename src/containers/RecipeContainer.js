import React, { Component } from 'react';
import RecipePreview from '../components/RecipePreview'

class RecipeContainer extends Component {
  state = {
    recipes: [],
    filter: ""
  }

  componentDidMount() {
    fetch("http://localhost:4000/api/v1/recipes")
    .then(res => res.json())
    .then(data => {
      this.setState({
        recipes: data
      })
    })
  }

  handleChange = e => {
    this.setState({
      filter: e.target.value
    })
  }

  render() {
    const filteredRecipes = this.state.recipes.filter(recipe => recipe.name.includes(this.state.filter))

    return (
      <div>
        <h2>RecipeContainer</h2>
        <div className="filter-form">
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.filter}
            placeholder="Filter by recipe name"
          />
        </div>
        {filteredRecipes.map(recipe => <RecipePreview key={recipe.id} recipe={recipe}/>)}
      </div>
    );
  }

}

export default RecipeContainer;

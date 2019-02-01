import React, { Component } from 'react';
import { connect } from 'react-redux'
import RecipePreview from '../components/RecipePreview'
import RecipeView from '../components/RecipeView'

class RecipeContainer extends Component {
  state = {
    filter: ""
  }

  // componentDidMount() {
  //   fetch("http://localhost:4000/api/v1/recipes")
  //   .then(res => res.json())
  //   .then(data => {
  //     this.props.loadRecipes(data)
  //   })
  // }

  handleChange = e => {
    this.setState({
      filter: e.target.value.toLowerCase()
    })
  }

  render() {
    const filteredRecipes = this.props.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.filter))
    const recipeList = () => filteredRecipes.map(recipe => <RecipePreview key={recipe.id} recipe={recipe}/>)

    return (
      <div className="recipe-container">
        <div className="filter-form">
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.filter}
            placeholder="Filter by recipe name"
          />
        </div>
        {this.props.viewedRecipeId ? <RecipeView /> : recipeList()}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    viewedRecipeId: state.viewedRecipeId
  }
}

export default connect(mapStateToProps)(RecipeContainer)

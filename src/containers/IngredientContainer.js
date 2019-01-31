import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ingredient from '../components/Ingredient'
import withSelect from '../hocs/withSelect'

class IngredientContainer extends Component {
  componentDidMount() {
    fetch("http://localhost:4000/api/v1/ingredients")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return this.props.loadIngredients(data)
    })
  }

  render() {
    const SelectableIngredient = withSelect(Ingredient)

    return (
      <div>
        <h2>IngredientContainer</h2>
        {this.props.ingredients.map(ingred => {
          return <SelectableIngredient key={ingred.id} ingred={ingred} selectable={true}/>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadIngredients: (loadedIngredients) => dispatch({type: "LOAD_INGREDIENTS", ingredients: loadedIngredients})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientContainer)

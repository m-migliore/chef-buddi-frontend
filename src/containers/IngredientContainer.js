import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ingredient from '../components/Ingredient'
import withSelect from '../hocs/withSelect'

class IngredientContainer extends Component {
  state = {
    ingredients: [],
    filter: ""
  }

  componentDidMount() {
    fetch("http://localhost:4000/api/v1/ingredients")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      //this.props.loadIngredients(data)
      this.setState({
        ingredients: data
      })
    })
  }

  handleChange = e => {
    this.setState({
      filter: e.target.value
    })
  }

  render() {
    // const SelectableIngredient = withSelect(Ingredient)
    const filteredIngredients = this.state.ingredients.filter(ingred => ingred.name.includes(this.state.filter))

    return (
      <div>
        <h2>IngredientContainer</h2>
        <div className="filter-form">
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.filter}
            placeholder="Filter by ingredient"
          />
        </div>
        {/* {this.state.ingredients.map(ingred => {
          // return <SelectableIngredient key={ingred.id} ingred={ingred} selectable={true}/>
          return <Ingredient key={ingred.id} ingred={ingred}/>
        })} */}

        {filteredIngredients.map(ingred => {
          // return <SelectableIngredient key={ingred.id} ingred={ingred} selectable={true}/>
          return <Ingredient key={ingred.id} ingred={ingred}/>
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

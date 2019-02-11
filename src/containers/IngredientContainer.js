import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Ingredient from '../components/Ingredient'
// import withSelect from '../hocs/withSelect'

class IngredientContainer extends Component {
  state = {
    filter: ""
  }

  handleChange = e => {
    this.setState({
      filter: e.target.value.toLowerCase()
    })
  }

  render() {
    const filteredIngredients = this.props.ingredients.filter(ingred => ingred.name.toLowerCase().includes(this.state.filter))

    return (
      <div className="ingredient-container container">
        {/* {window.location.pathname === "/find-recipes" ? null : <div className="filter-form">
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.filter}
            placeholder="Filter by ingredient"
          />
        </div>} */}
        <div className="row filter-form">
          <div className="col-12">
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.filter}
              placeholder="Filter by ingredient"
              className="form-control"
            />
          </div>
        </div>

        {filteredIngredients.map(ingred => {
          return <Ingredient key={ingred.id} ingred={ingred}/>
        })}
      </div>
    )
  }
}

export default IngredientContainer

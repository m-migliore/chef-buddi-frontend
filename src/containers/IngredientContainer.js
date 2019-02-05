import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Ingredient from '../components/Ingredient'
// import withSelect from '../hocs/withSelect'

class IngredientContainer extends Component {
  state = {
    filter: ""
  }

  // componentDidMount() {
  //   fetch("http://localhost:4000/api/v1/ingredients")
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     this.props.loadIngredients(data)
  //   })
  // }

  handleChange = e => {
    this.setState({
      filter: e.target.value.toLowerCase()
    })
  }

  render() {
    // const SelectableIngredient = withSelect(Ingredient)
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

// const mapStateToProps = state => {
//   return {
//     ingredients: state.ingredients,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadIngredients: (loadedIngredients) => dispatch({type: "LOAD_INGREDIENTS", payload: loadedIngredients})
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(IngredientContainer)
export default IngredientContainer

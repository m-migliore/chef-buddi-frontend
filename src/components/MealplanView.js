import React, { Component } from 'react';
import { connect } from "react-redux"
import RecipeContainer from '../containers/RecipeContainer'
import IngredientContainer from '../containers/IngredientContainer'

class MealplanView extends Component {
  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/mealplans/${this.props.viewedMealplanId}`)
    .then(res => res.json())
    .then(data => {
      this.props.setViewedMealplan(data)
    })
  }
  dataRefresh = () => {
    fetch(`http://localhost:4000/api/v1/mealplans/${this.props.viewedMealplanId}`)
    .then(res => res.json())
    .then(data => {
      this.props.refreshMealplanData(data)
    })
  }

  handleDelete = () => {
    console.log("delete mealplan");
    fetch(`http://localhost:4000/api/v1/mealplans/${this.props.viewedMealplanId}`, {
      method: "DELETE"
    })
    .then( this.props.postMealplanDelete(this.props.viewedMealplanId) )

  }

  handleAdd = () => {
    console.log("add");
    this.props.startAddingMeals()
  }

  handleBack = () => {
    this.props.stopAddingMeals()
  }

  renderMealplanContent = () => {
    const mealplan = this.props.viewedMealplan

    return <>
             <div className="mealplan-meals">
               <div className="container">
                 <div className="row">
                   <div className="col">
                     <h3 className="rainbow-sub">Meals</h3>
                   </div>
                 </div>
               </div>
               {this.props.viewedMealplan ? <RecipeContainer recipes={mealplan.recipes}/> : <h4>No Meals Found</h4>}
             </div>

             <div className="mealplan-shopping-list">
               <div className="container">
                 <div className="row">
                   <div className="col">
                     <h3 className="rainbow-sub">Shopping List</h3>
                   </div>
                 </div>
               </div>
               {this.props.viewedMealplan ? <IngredientContainer ingredients={mealplan.shoppingList}/> : <h4>Shopping List is Empty</h4>}
             </div>
           </>
  }

  renderMealAdder = () => {
    const currentMealRecipeIds = this.props.viewedMealplan.recipes.map(recipe => recipe.id)
    const availableRecipes = this.props.userRecipes.filter(recipe => !currentMealRecipeIds.includes(recipe['recipe_id']))
    return <RecipeContainer recipes={availableRecipes} />
  }

  render() {
    // const mealplan = this.props.viewedMealplan

    return (
      <>
        {this.props.successfulMealAdd ? this.dataRefresh() : null}
        <div className="container">
          <div className="row">
            <div className="col-12">
              {this.props.viewedMealplan ? <h2>{this.props.viewedMealplan.title}</h2> : null}
            </div>

            {this.props.addingMeals ?
              <div className="col-12">
                <button className="btn btn-primary" onClick={this.handleBack}>Back</button>
              </div>
            :
              <div className="col-12 mealplan-start-btns">
                <button className="btn btn-primary" onClick={this.handleAdd}>Add Meals</button>
                <button className="btn btn-primary" onClick={this.handleDelete}>Delete Mealplan</button>
              </div>
            }

          </div>
        </div>

        {this.props.addingMeals ? this.renderMealAdder() : this.renderMealplanContent()}
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    viewedMealplanId: state.viewedMealplanId,
    viewedMealplan: state.viewedMealplan,
    mealDeleted: state.mealDeleted,
    addingMeals: state.addingMeals,
    userRecipes: state.userRecipes,
    successfulMealAdd: state.successfulMealAdd
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setViewedMealplan: mealplan => dispatch({type: "SET_VIEWED_MEALPLAN", payload: mealplan}),
    postMealplanDelete: deletedMealplanId => dispatch({type: "POST_MEALPLAN_DELETE", payload: deletedMealplanId}),
    startAddingMeals: () => dispatch({type: "START_ADDING_MEALS"}),
    stopAddingMeals: () => dispatch({type: "STOP_ADDING_MEALS"}),
    refreshMealplanData: mealplan => dispatch({type: "REFRESH_MEALPLAN_DATA", payload: mealplan})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealplanView)

const defaultState = {
  currentUserId: 3,
  currentUser: {},
  ingredients: [],
  userIngredients: [],
  userRecipes: [],
  recipes: [],
  viewedRecipeId: null,
  viewedRecipe: null,
  selectedIngredients: [],
  queryIngredients: [],
  stepsCompleted: 0,
  stepThreeIngredients: [],
  recipeSearchCompleted: false,
  foundRecipes: [],
  successfulRecipeSave: false
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "LOAD_INGREDIENTS":
      return {...state, ingredients: action.payload}
    case "LOAD_USER_INGREDIENTS":
      return {...state,  userIngredients: action.payload}
    case "LOAD_QUERY_INGREDIENTS":
      if (action.payload === "user") {
        return {...state, queryIngredients: state.userIngredients, stepsCompleted: 1}
      } else {
        return {...state, queryIngredients: state.ingredients, stepsCompleted: 1}
      }
    case "LOAD_RECIPES":
      return {...state, recipes: action.payload}
    case "SET_VIEW_RECIPE_ID":
      return {...state, viewedRecipeId: action.payload}
    case "SET_VIEW_RECIPE":
      return {...state, viewedRecipe: action.payload}
    case "CLEAR_VIEW_RECIPE_ID":
      return {...state, viewedRecipeId: null}
    case "SELECT_INGREDIENT":
      if (state.selectedIngredients.includes(action.payload)) {
        const currentSelections = [...state.selectedIngredients]
        const updatedSelections = currentSelections.filter(selection => selection !== action.payload)
        return {...state, selectedIngredients: updatedSelections}
      } else {
        return {...state, selectedIngredients: [...state.selectedIngredients, action.payload]}
      }
    case "COMPLETE_STEP_TWO":
      const ingredients = state.ingredients.filter(ingred => action.payload.includes(ingred.id))
      return {...state, stepsCompleted: 2, stepThreeIngredients: ingredients, selectedIngredients: []}
    case "LOAD_FOUND_RECIPES":
      return {...state, foundRecipes: action.payload, recipeSearchCompleted: true}
    case "RESET_FIND_PARAMS":
      return {...state, stepsCompleted: 0, viewedRecipeId: null, viewedRecipe: null}
    case "SET_RECIPE_SAVE_STATUS":
      return {...state, successfulRecipeSave: true}
    case "UPDATE_USER_INGREDIENTS":
      // console.log("hit reducer");
      // fetch(`http://localhost:4000/api/v1/users/${action.payload}`)
      // .then(res => res.json())
      // .then(data => {
      //   return {...state, ingredients: state.ingredients, userIngredients: data}
      // })
      const updatedUserIngredients = [...state.userIngredients].filter(ingred => ingred.id !== action.payload)
      return {...state, userIngredients: updatedUserIngredients}
    default:
      return defaultState
  }
}

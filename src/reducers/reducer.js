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
  stepsCompleted: 0
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
        return {...state, queryIngredients: state.userIngredients, stepsCompleted: state.stepsCompleted = 1}
      } else {
        return {...state, queryIngredients: state.ingredients, stepsCompleted: state.stepsCompleted = 1}
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
    default:
      return defaultState
  }
}

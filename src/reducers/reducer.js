const defaultState = {
  currentUserId: 3,
  currentUser: {},
  userIngredients: [],
  ingredients: [],
  userRecipes: [],
  recipes: [],
  viewedRecipeId: null,
  viewedRecipe: null,
  selectedIngredients: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "LOAD_INGREDIENTS":
      return {...state, ingredients: action.payload}
    case "LOAD_RECIPES":
      return {...state, recipes: action.payload}
    case "SET_VIEW_RECIPE_ID":
      return {...state, viewedRecipeId: action.payload}
    case "SET_VIEW_RECIPE":
      return {...state, viewedRecipe: action.payload}
    case "CLEAR_VIEW_RECIPE_ID":
      return {...state, viewedRecipeId: null}
    case "ADD_SELECTED_INGREDIENT":
      console.log(`selected ingrd id: ${action.payload}`)
      console.log("selected ingredients:", state.selectedIngredients);
      return {...state, selectedIngredients: [...state.selectedIngredients, action.payload]}
    default:
      return defaultState
  }
}

const defaultState = {
  currentUserId: 3,
  currentUser: {},
  userIngredients: [],
  ingredients: [],
  userRecipes: [],
  recipes: [],
  viewedRecipe: null,
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "LOAD_INGREDIENTS":
      return {...state, ingredients: action.payload}
    case "LOAD_RECIPES":
      return {...state, recipes: action.payload}
    case "VIEW_RECIPE":
      console.log(action.payload);
      return {...state, viewedRecipe: action.payload}
    default:
      return defaultState
  }
}

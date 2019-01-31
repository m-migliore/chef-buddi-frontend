const defaultState = {
  currentUserId: 3,
  userIngredients: [],
  ingredients: [],
  userRecipes: [],
  recipes: []
}

export default function reducer(state=defaultState, action) {
  switch(action.type) {
    case "LOAD_INGREDIENTS":
      return {...state, ingredients: action.ingredients}
    case "VIEW_RECIPE":
      return console.log("view recipe");
    default:
      return defaultState
  }
}

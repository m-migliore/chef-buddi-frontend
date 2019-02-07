const defaultState = {
  currentUserId: null,
  currentUser: {},
  ingredients: [],
  userIngredients: [],
  userRecipes: [],
  recipes: [],
  viewedRecipeId: null,
  viewedRecipe: null,
  viewedUserRecipeId: null,
  selectedIngredients: [],
  queryIngredients: [],
  userIngredSearch: false,
  stepsCompleted: 0,
  stepThreeIngredients: [],
  recipeSearchCompleted: false,
  foundRecipes: [],
  successfulRecipeSave: false,
  ingredientInputs: [1],
  ingredientInputValues: "",
  homeFormType: null
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser:action.payload,
        currentUserId: action.payload.id,
        userIngredients: action.payload.ingredients,
        userRecipes: action.payload.recipes
      }
    case "SET_CURRENT_USER":
      // const userRecipeIds = action.payload.recipes.map(recipe => recipe['recipe_id'])
      // const userRecipes = state.recipes.filter(recipe => userRecipeIds.includes(recipe.id))
      // return {...state, currentUser: action.payload, userRecipes}

      return {...state, currentUser: action.payload, userRecipes: action.payload.recipes}
    case "LOAD_INGREDIENTS":
      return {...state, ingredients: action.payload}
    case "LOAD_USER_INGREDIENTS":
      return {...state,  userIngredients: action.payload}
    case "LOAD_QUERY_INGREDIENTS":
      if (action.payload === "user") {
        return {...state, queryIngredients: state.userIngredients, stepsCompleted: 1, userIngredSearch: true}
      } else {
        return {...state, queryIngredients: state.ingredients, stepsCompleted: 1}
      }
    case "LOAD_RECIPES":
      return {...state, recipes: action.payload}
    case "SET_VIEW_RECIPE_ID":
      return {...state, viewedRecipeId: action.payload}
    case "SET_VIEW_USER_RECIPE_ID":
      return {...state, viewedRecipeId: action.payload.recipeId, viewedUserRecipeId: action.payload.userRecipeId, successfulRecipeSave: false}
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
      return {...state, stepsCompleted: 0, viewedRecipeId: null, viewedRecipe: null, userIngredSearch: false, recipeSearchCompleted: false}
    case "SET_RECIPE_SAVE_STATUS":
      return {...state, successfulRecipeSave: true}
    case "REMOVE_USER_INGREDIENT":
      const updatedUserIngredients = [...state.userIngredients].filter(ingred => ingred.id !== action.payload)
      return {...state, userIngredients: updatedUserIngredients}
    case "ADD_USER_INGREDIENT":
      return {...state, userIngredients: [...state.userIngredients, action.payload]}
    case "POST_REMOVE_USER_RECIPE":
      console.log("hit post remove")
      const updatedUserRecipes = state.userRecipes.filter(recipe => recipe.id !== action.payload)
      return {...state, viewedRecipeId: null, viewedRecipe: null, viewedUserRecipeId: null, userRecipes: updatedUserRecipes}
    case "ADD_INGRED_INPUT_FOR_ADD_RECIPE":
      return {...state, ingredientInputs: [...state.ingredientInputs, state.ingredientInputs.length + 1]}
    case "ADD_INGRED_INPUT_VALUE":
      return {...state, ingredientInputValues: action.payload}
    case "SET_HOME_FORM_TYPE":
      return {...state, homeFormType: action.payload}
    default:
      return defaultState
  }
}

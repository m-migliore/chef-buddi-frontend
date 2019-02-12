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
  findRecipeStepsCompleted: 0,
  stepThreeIngredients: [],
  recipeSearchCompleted: false,
  foundRecipes: [],
  successfulRecipeSave: false,
  ingredientInputs: [1],
  ingredientInputValues: "",
  homeFormType: null,
  mealplanStepsCompleted: 0,
  createdMealplanTitle: "",
  stagedMealplanRecipes: [],
  successfulMealplanCreate: false,
  userMealplans: [],
  viewedMealplanId: null,
  viewedMealplan: null,
  viewedMealId: null,
  mealDeleted: false,
  profileView: "ingredients",
  errors: null
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser:action.payload,
        currentUserId: action.payload.id,
        userIngredients: action.payload.ingredients,
        userRecipes: action.payload.recipes,
        userMealplans: action.payload.mealplans,
        errors: null
      }
    case "SET_USER_DATA":
      // const userRecipeIds = action.payload.recipes.map(recipe => recipe['recipe_id'])
      // const userRecipes = state.recipes.filter(recipe => userRecipeIds.includes(recipe.id))
      // return {...state, currentUser: action.payload, userRecipes}

      // return {...state, currentUser: action.payload, userRecipes: action.payload.recipes}
      return {
        ...state,
        currentUser:action.payload,
        currentUserId: action.payload.id,
        userIngredients: action.payload.ingredients,
        userRecipes: action.payload.recipes,
        userMealplans: action.payload.mealplans,
        mealDeleted: false
      }
    case "LOAD_INGREDIENTS":
      return {...state, ingredients: action.payload}
    case "LOAD_USER_INGREDIENTS":
      return {...state,  userIngredients: action.payload}
    case "LOAD_QUERY_INGREDIENTS":
      if (action.payload === "user") {
        return {...state, queryIngredients: state.userIngredients, findRecipeStepsCompleted: 1, userIngredSearch: true}
      } else {
        return {...state, queryIngredients: state.ingredients, findRecipeStepsCompleted: 1}
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
      return {...state, viewedRecipeId: null, viewedRecipe: null}
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
      return {...state, findRecipeStepsCompleted: 2, stepThreeIngredients: ingredients, selectedIngredients: []}
    case "LOAD_FOUND_RECIPES":
      return {...state, foundRecipes: action.payload, recipeSearchCompleted: true}
    case "RESET_FIND_PARAMS":
      return {
        ...state,
        findRecipeStepsCompleted: 0,
        viewedRecipeId: null,
        viewedRecipe: null,
        userIngredSearch: false,
        recipeSearchCompleted: false,
        successfulRecipeSave: false
      }
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
    case "COMPLETE_MEALPLAN_STEP_ONE":
      // return {...state, mealplanStepsCompleted: 1, createdMealplan: action.payload}
      return {...state, mealplanStepsCompleted: 1, createdMealplanTitle: action.payload}
    case "STAGE_RECIPE_TO_MEALPLAN":
      // const recipeId = action.payload['recipe_id']
      // const updatedAvailable = state.availableMealplanRecipes.filter(recipe => !recipe['recipe_id'] === recipeId)
      // return {
      //   ...state,
      //   stagedMealplanRecipes: [...state.stagedMealplanRecipes, action.payload],
      //   availableMealplanRecipes: updatedAvailable
      // }
      return {...state, stagedMealplanRecipes: [...state.stagedMealplanRecipes, action.payload], viewedRecipe: null, viewedRecipeId: null}
    case "COMPLETE_MEALPLAN_STEP_TWO":
      return {...state, mealplanStepsCompleted: 2}
    case "REMOVE_MEALPLAN_RECIPE":
      const updatedRecipes = state.stagedMealplanRecipes.filter(recipe => !action.payload)
      return {...state, stagedMealplanRecipes: updatedRecipes, viewedRecipe: null, viewedRecipeId: null}
    case "MEALPLAN_CREATED":
      return {...state, successfulMealplanCreate: true}
    case "SET_VIEWED_MEALPLAN_ID":
      return {...state, viewedMealplanId: action.payload}
    case "SET_VIEWED_MEALPLAN":
      return {...state, viewedMealplan: action.payload, mealDeleted: false,  viewedRecipeId: null, viewedRecipe: null, viewedMealId: null}
    case "CLEAR_MEALPLAN_DATA":
      return {...state, viewedMealplanId: null, viewedMealplan: null}
    case "SET_VIEW_MEAL_IDS":
      return {...state, viewedRecipeId: action.payload.recipeId, viewedMealId: action.payload.mealId}
    case "CLEAR_MEAL_PARAMS":
      return {...state, viewedRecipeId: null, viewedRecipe: null, viewedMealId: null, mealDeleted: true}
    case "SET_PROFILE_VIEW":
      return {...state, profileView: action.payload}
    case "POST_MEALPLAN_DELETE":
      const updatedMealplans = state.userMealplans.filter(mealplan => mealplan.id !== action.payload)
      return {...state, viewedMealplanId: null, viewedMealplan: null, userMealplans: updatedMealplans}
    case "HANDLE_LOGIN_ERROR":
      return {...state, errors: action.payload}
    default:
      return defaultState
  }
}
